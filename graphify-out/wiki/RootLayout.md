# RootLayout

**Dosya**: `app/_layout.tsx:9`

Expo-router Stack'i kurar, StatusBar'ı yönetir ve `ThemeContext`'i sağlar (light/dark mod state'i burada tutulur).

## Bağlantılar
- provides → [useTheme](hooks.md) (ThemeContext değeri)
- imports → [theme](theme.md) (Colors), [types](types.md) (ThemeMode)
- Altındaki tek route: [HomeScreen](HomeScreen.md)
