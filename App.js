import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TamaguiProvider } from '@tamagui/core';
import Navigation from './src/navigation';
import tamaguiConfig from './src/theme/tamagui.config';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
        <Navigation />
        <StatusBar style="light" />
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
}
