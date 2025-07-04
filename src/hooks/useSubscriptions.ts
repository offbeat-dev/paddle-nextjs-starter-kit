import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { PaddleSubscription } from '../types/paddle';

export function useSubscriptions() {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<PaddleSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSubscriptions = async () => {
    if (!user?.email) {
      setSubscriptions([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Get customer data first
      const { data: customer } = await supabase
        .from('customers')
        .select('customer_id')
        .eq('email', user.email)
        .single();

      if (customer) {
        // Get subscriptions for this customer
        const { data: subscriptions, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('customer_id', customer.customer_id)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        const mappedSubscriptions: PaddleSubscription[] = (subscriptions || []).map(sub => ({
          id: sub.subscription_id,
          status: sub.subscription_status,
          priceId: sub.price_id,
          productId: sub.product_id,
          customerId: sub.customer_id,
          createdAt: sub.created_at,
          updatedAt: sub.updated_at,
          scheduledChange: sub.scheduled_change,
        }));

        setSubscriptions(mappedSubscriptions);
      } else {
        setSubscriptions([]);
      }
    } catch (err) {
      console.error('Failed to load subscriptions:', err);
      setError('Failed to load subscriptions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubscriptions();
  }, [user?.email]);

  return {
    subscriptions,
    loading,
    error,
    refetch: loadSubscriptions,
  };
}