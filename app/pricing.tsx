import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PRICING_TIERS } from '../src/constants/PricingTiers';
import { Colors } from '../src/constants/Colors';
import { useAuth } from '../src/hooks/useAuth';
import { usePaddle } from '../src/providers/PaddleProvider';

export default function PricingScreen() {
  const [billingCycle, setBillingCycle] = useState<'month' | 'year'>('month');
  const [prices, setPrices] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { getPrices, openCheckout } = usePaddle();

  useEffect(() => {
    loadPrices();
  }, [billingCycle]);

  const loadPrices = async () => {
    setLoading(true);
    try {
      const priceIds = PRICING_TIERS.map(tier => tier.priceId[billingCycle]);
      const priceData = await getPrices(priceIds);
      setPrices(priceData);
    } catch (error) {
      console.error('Failed to load prices:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlan = async (tier: typeof PRICING_TIERS[0]) => {
    if (!user) {
      router.push('/auth/signup');
      return;
    }

    try {
      await openCheckout({
        priceId: tier.priceId[billingCycle],
        email: user.email || undefined,
      });
    } catch (error) {
      console.error('Failed to open checkout:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Plan</Text>
          <Text style={styles.subtitle}>
            Select the perfect plan for your team's needs
          </Text>
        </View>

        {/* Billing Toggle */}
        <View style={styles.billingToggle}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              billingCycle === 'month' && styles.toggleButtonActive,
            ]}
            onPress={() => setBillingCycle('month')}
          >
            <Text
              style={[
                styles.toggleText,
                billingCycle === 'month' && styles.toggleTextActive,
              ]}
            >
              Monthly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              billingCycle === 'year' && styles.toggleButtonActive,
            ]}
            onPress={() => setBillingCycle('year')}
          >
            <Text
              style={[
                styles.toggleText,
                billingCycle === 'year' && styles.toggleTextActive,
              ]}
            >
              Annual
            </Text>
          </TouchableOpacity>
        </View>

        {/* Pricing Cards */}
        <View style={styles.pricingGrid}>
          {PRICING_TIERS.map((tier) => (
            <View
              key={tier.id}
              style={[
                styles.pricingCard,
                tier.featured && styles.featuredCard,
              ]}
            >
              {tier.featured && (
                <View style={styles.featuredBadge}>
                  <Text style={styles.featuredBadgeText}>Most Popular</Text>
                </View>
              )}

              <View style={styles.cardHeader}>
                <Text style={styles.planName}>{tier.name}</Text>
                <Text style={styles.planDescription}>{tier.description}</Text>
              </View>

              <View style={styles.priceContainer}>
                {loading ? (
                  <ActivityIndicator color={Colors.accent} />
                ) : (
                  <>
                    <Text style={styles.price}>
                      {prices[tier.priceId[billingCycle]] || '$0'}
                    </Text>
                    <Text style={styles.priceFrequency}>
                      per user/{billingCycle}
                    </Text>
                  </>
                )}
              </View>

              <TouchableOpacity
                style={[
                  styles.selectButton,
                  tier.featured && styles.selectButtonFeatured,
                ]}
                onPress={() => handleSelectPlan(tier)}
              >
                <Text
                  style={[
                    styles.selectButtonText,
                    tier.featured && styles.selectButtonTextFeatured,
                  ]}
                >
                  Get Started
                </Text>
              </TouchableOpacity>

              <View style={styles.features}>
                {tier.features.map((feature, index) => (
                  <View key={index} style={styles.feature}>
                    <Text style={styles.featureText}>✓ {feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  billingToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 8,
    padding: 4,
    marginBottom: 40,
    alignSelf: 'center',
  },
  toggleButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
  },
  toggleButtonActive: {
    backgroundColor: Colors.accent,
  },
  toggleText: {
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  toggleTextActive: {
    color: Colors.background,
  },
  pricingGrid: {
    gap: 20,
  },
  pricingCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
  },
  featuredCard: {
    borderColor: Colors.accent,
    borderWidth: 2,
  },
  featuredBadge: {
    position: 'absolute',
    top: -12,
    left: 24,
    backgroundColor: Colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featuredBadgeText: {
    color: Colors.background,
    fontSize: 12,
    fontWeight: '600',
  },
  cardHeader: {
    marginBottom: 24,
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  planDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  priceContainer: {
    marginBottom: 24,
    alignItems: 'center',
    minHeight: 60,
    justifyContent: 'center',
  },
  price: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  priceFrequency: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  selectButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  selectButtonFeatured: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  selectButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  selectButtonTextFeatured: {
    color: Colors.background,
  },
  features: {
    gap: 12,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 14,
    color: Colors.primary,
    marginLeft: 8,
  },
});