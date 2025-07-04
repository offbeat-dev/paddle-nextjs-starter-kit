import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert, Linking } from 'react-native';
import Constants from 'expo-constants';
import { PaddleCheckoutOptions } from '../types/paddle';

interface PaddleContextType {
  paddleLoaded: boolean;
  openCheckout: (options: PaddleCheckoutOptions) => Promise<void>;
  getPrices: (priceIds: string[], country?: string) => Promise<Record<string, string>>;
}

const PaddleContext = createContext<PaddleContextType | undefined>(undefined);

export function PaddleProvider({ children }: { children: React.ReactNode }) {
  const [paddleLoaded, setPaddleLoaded] = useState(false);

  useEffect(() => {
    // Initialize Paddle
    const initPaddle = async () => {
      try {
        // For React Native, we'll simulate Paddle initialization
        // In a real app, you'd integrate with Paddle's React Native SDK
        // or use a WebView-based checkout
        setPaddleLoaded(true);
      } catch (error) {
        console.error('Failed to initialize Paddle:', error);
      }
    };

    initPaddle();
  }, []);

  const openCheckout = async (options: PaddleCheckoutOptions) => {
    try {
      // In a real implementation, this would:
      // 1. Use Paddle's React Native SDK for native checkout
      // 2. Or open a WebView with Paddle's checkout URL
      // 3. Or redirect to your web app's checkout page
      
      const checkoutUrl = `https://your-app.com/checkout/${options.priceId}${
        options.email ? `?email=${encodeURIComponent(options.email)}` : ''
      }`;

      const canOpen = await Linking.canOpenURL(checkoutUrl);
      if (canOpen) {
        await Linking.openURL(checkoutUrl);
      } else {
        Alert.alert(
          'Checkout',
          'Opening checkout in browser...',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open', onPress: () => Linking.openURL(checkoutUrl) }
          ]
        );
      }
    } catch (error) {
      console.error('Failed to open checkout:', error);
      Alert.alert('Error', 'Failed to open checkout. Please try again.');
    }
  };

  const getPrices = async (priceIds: string[], country?: string): Promise<Record<string, string>> => {
    try {
      // In a real implementation, this would fetch prices from Paddle API
      // For now, return mock prices
      const mockPrices: Record<string, string> = {
        'pri_01hsxyh9txq4rzbrhbyngkhy46': '$9',
        'pri_01hsxycme6m95sejkz7sbz5e9g': '$29',
        'pri_01hsxyeb2bmrg618bzwcwvdd6q': '$290',
        'pri_01hsxyff091kyc9rjzx7zm6yqh': '$99',
        'pri_01hsxyfysbzf90tkh2wqbfxwa5': '$990',
      };

      return priceIds.reduce((acc, priceId) => {
        acc[priceId] = mockPrices[priceId] || '$0';
        return acc;
      }, {} as Record<string, string>);
    } catch (error) {
      console.error('Failed to fetch prices:', error);
      return {};
    }
  };

  return (
    <PaddleContext.Provider
      value={{
        paddleLoaded,
        openCheckout,
        getPrices,
      }}
    >
      {children}
    </PaddleContext.Provider>
  );
}

export function usePaddle() {
  const context = useContext(PaddleContext);
  if (context === undefined) {
    throw new Error('usePaddle must be used within a PaddleProvider');
  }
  return context;
}