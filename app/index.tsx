import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../src/hooks/useAuth';
import { Colors } from '../src/constants/Colors';

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>AeroEdit</Text>
          <TouchableOpacity
            style={styles.authButton}
            onPress={() => router.push(user ? '/dashboard' : '/auth/login')}
          >
            <Text style={styles.authButtonText}>
              {user ? 'Dashboard' : 'Sign In'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            Powerful design tools.{'\n'}Simple pricing.
          </Text>
          <Text style={styles.heroSubtitle}>
            Plans for teams of every size — from start-up to enterprise.
          </Text>
        </View>

        {/* CTA Buttons */}
        <View style={styles.ctaContainer}>
          <Link href="/pricing" asChild>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>View Pricing</Text>
            </TouchableOpacity>
          </Link>
          
          {!user && (
            <Link href="/auth/signup" asChild>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Get Started</Text>
              </TouchableOpacity>
            </Link>
          )}
        </View>

        {/* Features */}
        <View style={styles.features}>
          <Text style={styles.featuresTitle}>Why Choose AeroEdit?</Text>
          <View style={styles.featuresList}>
            <View style={styles.feature}>
              <Text style={styles.featureTitle}>Real-time Collaboration</Text>
              <Text style={styles.featureDescription}>
                Work together with your team in real-time
              </Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureTitle}>Advanced Editing Tools</Text>
              <Text style={styles.featureDescription}>
                Professional-grade tools for all your design needs
              </Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureTitle}>Cloud Storage</Text>
              <Text style={styles.featureDescription}>
                Access your projects from anywhere, anytime
              </Text>
            </View>
          </View>
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
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  authButton: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  authButtonText: {
    color: Colors.background,
    fontWeight: '600',
  },
  hero: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 44,
  },
  heroSubtitle: {
    fontSize: 18,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
  },
  ctaContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  features: {
    paddingVertical: 40,
  },
  featuresTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 40,
  },
  featuresList: {
    gap: 24,
  },
  feature: {
    backgroundColor: Colors.card,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});