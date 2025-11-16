import { Platform } from 'react-native';
import { YStack, XStack } from '@tamagui/core';
import Animated from 'react-native-reanimated';

// On web, Tamagui components don't work well with Reanimated's createAnimatedComponent
// So we just use the regular Tamagui components (they still support basic styling/layout)
// Animations will be less smooth on web but the app will work
export const AnimatedYStack = Platform.OS === 'web' 
  ? YStack
  : Animated.createAnimatedComponent(YStack);

export const AnimatedXStack = Platform.OS === 'web'
  ? XStack
  : Animated.createAnimatedComponent(XStack);
