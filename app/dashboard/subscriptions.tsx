import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../src/constants/Colors';
import { useSubscriptions } from '../../src/hooks/useSubscriptions';
import { LoadingSpinner } from '../../src/components/LoadingSpinner';
import { ErrorMessage } from '../../src/components/ErrorMessage';
import { formatDate } from '../../src/utils/formatters';

export default function SubscriptionsScreen() {
  const { subscriptions, loading, error, refetch } = useSubscriptions();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return Colors.success;
      case 'canceled':
        return Colors.error;
      case 'paused':
        return Colors.warning;
      default:
        return Colors.muted;
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading subscriptions..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Subscriptions</Text>
          <Text style={styles.subtitle}>
            Manage your active subscriptions and billing
          </Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => router.push('/pricing')}
          >

        {subscriptions.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No Subscriptions</Text>
            <Text style={styles.emptyDescription}>
              You don't have any active subscriptions yet.
            </Text>
            <TouchableOpacity style={styles.browseButton}>
              <Text style={styles.browseButtonText}>Browse Plans</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.subscriptionsList}>
            {subscriptions.map((subscription) => (
              <View key={subscription.subscription_id} style={styles.subscriptionCard}>
            <View key={subscription.id} style={styles.subscriptionCard}>
                  <View style={styles.cardTitle}>
                    <Text style={styles.subscriptionName}>
                      Subscription {subscription.subscription_id.slice(-8)}
                    Subscription {subscription.id.slice(-8)}
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusColor(subscription.subscription_status) },
                      { backgroundColor: getStatusColor(subscription.status) },
                    >
                      <Text style={styles.statusText}>
                        {subscription.subscription_status.toUpperCase()}
                      {subscription.status.toUpperCase()}
                    </View>
                  </View>
                </View>

                <View style={styles.cardContent}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Price ID:</Text>
                    <Text style={styles.infoValue}>
                      {subscription.priceId.slice(-8)}...
                    </Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Created:</Text>
                    <Text style={styles.infoValue}>
                      {formatDate(subscription.createdAt)}
                    </Text>
                  </View>

                  {subscription.scheduledChange && (
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Scheduled Change:</Text>
                      <Text style={styles.infoValue}>
                        {formatDate(subscription.scheduledChange)}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.cardActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>View Details</Text>
                  </TouchableOpacity>
                  
                  {subscription.status === 'active' && (
                    <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
                      <Text style={[styles.actionButtonText, styles.cancelButtonText]}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 12,
  },
  emptyDescription: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  browseButton: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: Colors.background,
    fontWeight: '600',
  },
  subscriptionsList: {
    gap: 16,
  },
  subscriptionCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeader: {
    marginBottom: 16,
  },
  cardTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subscriptionName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.background,
  },
  cardContent: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  cancelButton: {
    borderColor: Colors.error,
  },
  cancelButtonText: {
    color: Colors.error,
  },
});