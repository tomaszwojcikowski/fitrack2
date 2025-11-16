import { createTamagui, createTokens } from '@tamagui/core';
import { config } from '@tamagui/config/v3';

// Fitness app color scheme - inspired by modern fitness apps
const tokens = createTokens({
  color: {
    // Primary colors for the fitness theme
    primary: '#FF6B35',
    primaryDark: '#E85A2B',
    primaryLight: '#FF8558',
    
    // Secondary colors
    secondary: '#004E89',
    secondaryDark: '#003D6E',
    secondaryLight: '#1A6BA8',
    
    // Accent colors
    accent: '#00D9C0',
    accentDark: '#00B8A1',
    accentLight: '#33E0CC',
    
    // Neutral colors
    background: '#FFFFFF',
    backgroundDark: '#0F0F0F',
    surface: '#F5F5F5',
    surfaceDark: '#1A1A1A',
    
    // Text colors
    text: '#1A1A1A',
    textLight: '#666666',
    textDark: '#FFFFFF',
    
    // Status colors
    success: '#22C55E',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
    
    // Grayscale
    gray1: '#FAFAFA',
    gray2: '#F5F5F5',
    gray3: '#E5E5E5',
    gray4: '#D4D4D4',
    gray5: '#A3A3A3',
    gray6: '#737373',
    gray7: '#525252',
    gray8: '#404040',
    gray9: '#262626',
    gray10: '#666666',
    gray11: '#333333',
    gray12: '#1A1A1A',
    
    // Utility colors
    white: '#FFFFFF',
    black: '#000000',
    
    // Success variants
    successDark: '#16A34A',
    successLight: '#4ADE80',
  },
  space: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  size: {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 56,
    xxl: 64,
  },
  radius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 9999,
  },
  zIndex: {
    low: 1,
    medium: 10,
    high: 100,
    modal: 1000,
  },
});

const tamaguiConfig = createTamagui({
  ...config,
  tokens,
  themes: {
    light: {
      background: tokens.color.background,
      color: tokens.color.text,
      primary: tokens.color.primary,
      secondary: tokens.color.secondary,
      accent: tokens.color.accent,
    },
    dark: {
      background: tokens.color.backgroundDark,
      color: tokens.color.textDark,
      primary: tokens.color.primary,
      secondary: tokens.color.secondary,
      accent: tokens.color.accent,
    },
  },
});

export default tamaguiConfig;

export { tokens };
