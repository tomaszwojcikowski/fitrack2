import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TamaguiProvider } from '@tamagui/core';
import { ActivityIndicator, View } from 'react-native';
import Navigation from './src/navigation';
import tamaguiConfig from './src/theme/tamagui.config';
import { initializeDatabase } from './src/database/initializeDatabase';

export default function App() {
  const [isDbReady, setIsDbReady] = useState(false);

  useEffect(() => {
    initializeDatabase()
      .then(() => {
        console.log('Database ready');
        setIsDbReady(true);
      })
      .catch((error) => {
        console.error('Failed to initialize database:', error);
        // Still set ready to true to allow app to load
        setIsDbReady(true);
      });
  }, []);

  if (!isDbReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
        <Navigation />
        <StatusBar style="light" />
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
}
