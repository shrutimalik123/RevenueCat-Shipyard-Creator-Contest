import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './src/navigation/AppNavigator';
import { initializeRevenueCat, checkPremiumStatus } from './src/services/revenuecat';

const ONBOARDING_KEY = '@onboarding_completed';
const MESSAGE_COUNT_KEY = '@message_count';
const LAST_RESET_KEY = '@last_reset';

export default function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Initialize RevenueCat
      await initializeRevenueCat();

      // Check onboarding status
      const onboardingStatus = await AsyncStorage.getItem(ONBOARDING_KEY);
      setHasCompletedOnboarding(onboardingStatus === 'true');

      // Check premium status
      const premium = await checkPremiumStatus();
      setIsPremium(premium);

      // Load message count and check if reset needed
      await loadMessageCount();
    } catch (error) {
      console.error('App initialization error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessageCount = async () => {
    try {
      const count = await AsyncStorage.getItem(MESSAGE_COUNT_KEY);
      const lastReset = await AsyncStorage.getItem(LAST_RESET_KEY);

      const now = Date.now();
      const lastResetTime = lastReset ? parseInt(lastReset) : 0;
      const oneDayInMs = 24 * 60 * 60 * 1000;

      // Reset count if more than 24 hours have passed
      if (now - lastResetTime > oneDayInMs) {
        await AsyncStorage.setItem(MESSAGE_COUNT_KEY, '0');
        await AsyncStorage.setItem(LAST_RESET_KEY, now.toString());
        setMessageCount(0);
      } else {
        setMessageCount(count ? parseInt(count) : 0);
      }
    } catch (error) {
      console.error('Error loading message count:', error);
    }
  };

  const handleMessageSent = async () => {
    const newCount = messageCount + 1;
    setMessageCount(newCount);
    await AsyncStorage.setItem(MESSAGE_COUNT_KEY, newCount.toString());
  };

  const handleUpgrade = async () => {
    // In sandbox mode, just simulate upgrade
    console.log('Upgrade button pressed - sandbox mode');
    setIsPremium(true);

    // In production, this would call RevenueCat purchase flow:
    // const success = await purchasePackage(selectedPackage);
    // if (success) setIsPremium(true);
  };

  const handleOnboardingComplete = async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    setHasCompletedOnboarding(true);
  };

  if (isLoading) {
    return null; // Or a loading screen
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <AppNavigator
        hasCompletedOnboarding={hasCompletedOnboarding}
        isPremium={isPremium}
        messageCount={messageCount}
        onMessageSent={handleMessageSent}
        onUpgrade={handleUpgrade}
      />
    </SafeAreaProvider>
  );
}
