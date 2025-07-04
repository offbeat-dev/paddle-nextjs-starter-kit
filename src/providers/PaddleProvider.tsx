import React, { createContext, useContext, useEffect, useState } from 'react';
import Constants from 'expo-constants';

interface PaddleContextType {
  paddleLoaded: boolean;
  openCheckout: (priceId: string, email?: string) => Promise<void>;
  getPrices: (priceIds: string[], country?: string) => Promise<Record<string, string>>;
}

const PaddleContext = createContext<PaddleContextType | undefined>(undefined);

export function PaddleProvider({ children }: { children: React.ReactNode }) {
  const [paddleLoaded, setPaddleLoaded] = useState(false);

  useEffect(() => {
    // Initialize Paddle
    const initPaddle = async () => {
      try {
        // For React Native, we'll need to handle Paddle differently
        // This is a placeholder for Paddle initialization
        setPaddleLoaded(true);
      } catch (error) {
        console.error('Failed to initialize Paddle:', error);
      }
    };

    initPaddle();
  }, []);

  const openCheckout = async (priceId: string, email?: string) => {
    // Implement Paddle checkout for React Native
    // This might involve opening a WebView or using Paddle's React Native SDK
    console.log('Opening checkout for price:', priceId, 'email:', email);
  };

  const getPrices = async (priceIds: string[], country?: string): Promise<Record<string, string>> => {
    // Implement price fetching from Paddle API
    // This would typically be done through your backend
    return {};
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