import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../src/hooks/useAuth';
import { Colors } from '../../src/constants/Colors';
import { useSubscriptions } from '../../src/hooks/useSubscriptions';
import { LoadingSpinner } from '../../src/components/LoadingSpinner';

interface DashboardStats {
  activeSubscriptions: number;
  totalSpent: string;
  nextPayment: string;
}

export default function DashboardScreen() {
  const { user } = useAuth();
  const { subscriptions, loading: subscriptionsLoading } = useSubscriptions();
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    if (!subscriptionsLoading) {
      setStats({
        activeSubscriptions: subscriptions.filter(sub => sub.status === 'active').length,
        totalSpent: '$0.00', // This would come from Paddle API
        nextPayment: 'No upcoming payments',
      });
    }
  }, [subscriptions, subscriptionsLoading]);

  if (subscriptionsLoading || !stats) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats?.activeSubscriptions || 0}</Text>
            <Text style={styles.statLabel}>Active Subscriptions</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats?.totalSpent || '$0.00'}</Text>
            <Text style={styles.statLabel}>Total Spent</Text>
          </View>

          <View style={[styles.statCard, styles.fullWidth]}>
            <Text style={styles.statValue}>{stats?.nextPayment || 'None'}</Text>
            <Text style={styles.statLabel}>Next Payment</Text>
          </View>
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionTitle}>View Subscriptions</Text>
            <Text style={styles.actionDescription}>
              Manage your active subscriptions
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionTitle}>Payment History</Text>
            <Text style={styles.actionDescription}>
              View your payment history and invoices
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionTitle}>Upgrade Plan</Text>
            <Text style={styles.actionDescription}>
              Explore higher tier plans with more features
            </Text>
          </TouchableOpacity>
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
    paddingVertical: 30,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 40,
  },
  statCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    flex: 1,
    minWidth: '45%',
  },
  fullWidth: {
    width: '100%',
    flex: 'none',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  quickActions: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 20,
  },
  actionCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});