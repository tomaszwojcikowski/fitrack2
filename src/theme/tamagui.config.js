import { createTamagui, createTokens } from '@tamagui/core';
import { config as baseConfig } from '@tamagui/config/v3';
import { shorthands } from '@tamagui/shorthands';

// Extend the default Tamagui tokens with our fitness-oriented palette/spacing
const customTokens = createTokens({
  ...baseConfig.tokens,
  color: {
    ...baseConfig.tokens.color,
    primary: '#FF6B35',
    primaryDark: '#E85A2B',
    primaryLight: '#FF8558',
    secondary: '#004E89',
    secondaryDark: '#003D6E',
    secondaryLight: '#1A6BA8',
    accent: '#00D9C0',
    accentDark: '#00B8A1',
    accentLight: '#33E0CC',
    background: '#FFFFFF',
    backgroundDark: '#0F0F0F',
    surface: '#F5F5F5',
    surfaceDark: '#1A1A1A',
    text: '#1A1A1A',
    textLight: '#666666',
    textDark: '#FFFFFF',
    success: '#22C55E',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
    border: '#E5E5E5',
    textMuted: '#A0A0A0',
    gray1: '#FAFAFA',
    gray2: '#F5F5F5',
    gray3: '#E5E5E5',
    gray4: '#D4D4D4',
    gray5: '#A3A3A3',
    gray6: '#737373',
    gray7: '#525252',
    gray8: '#404040',
    gray9: '#262626',
    gray10: '#171717',
    gray11: '#0A0A0A',
    gray12: '#000000',
  },
  space: {
    ...baseConfig.tokens.space,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
  },
  size: {
    ...baseConfig.tokens.size,
  },
  radius: {
    ...baseConfig.tokens.radius,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 9999,
  },
  zIndex: {
    ...baseConfig.tokens.zIndex,
  },
});

const customThemes = {
  light: {
    ...baseConfig.themes?.light,
    primary: customTokens.color.primary,
    secondary: customTokens.color.secondary,
    accent: customTokens.color.accent,
    background: customTokens.color.background,
    text: customTokens.color.text,
    textLight: customTokens.color.textLight,
    border: customTokens.color.border,
  },
  dark: {
    ...baseConfig.themes?.dark,
    primary: customTokens.color.primary,
    secondary: customTokens.color.secondary,
    accent: customTokens.color.accent,
    background: '#1A1A1A',
    text: '#FFFFFF',
    textLight: '#A0A0A0',
    border: '#333333',
  },
};

const tamaguiConfig = createTamagui({
  ...baseConfig,
  tokens: customTokens,
  themes: {
    ...baseConfig.themes,
    ...customThemes,
  },
  shorthands,
  media: baseConfig.media,
  animations: baseConfig.animations,
});

export default tamaguiConfig;
export { tamaguiConfig, customTokens };
