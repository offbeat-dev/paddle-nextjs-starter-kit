import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../src/providers/AuthProvider';
import { PaddleProvider } from '../src/providers/PaddleProvider';
import 'react-native-url-polyfill/auto';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <PaddleProvider>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: '#0F1419',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="dashboard" options={{ headerShown: false }} />
            <Stack.Screen name="pricing" options={{ title: 'Pricing' }} />
            <Stack.Screen name="checkout" options={{ title: 'Checkout' }} />
          </Stack>
          <StatusBar style="light" />
        </PaddleProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}