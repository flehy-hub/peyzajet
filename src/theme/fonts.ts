import { Platform } from 'react-native';

const webFontFamily = '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif';
const nativeFontFamily = 'System';

export const Fonts = {
  family: Platform.OS === 'web' ? webFontFamily : nativeFontFamily,
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    md: 18,
    lg: 20,
    xl: 24,
    '2xl': 30,
    '3xl': 36,
    '4xl': 48,
    '5xl': 60,
    hero: 64,
  },
  weights: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
};
