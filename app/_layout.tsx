import { useState, useCallback, useEffect } from 'react';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from '../src/hooks/useTheme';
import { Colors } from '../src/theme/colors';
import type { ThemeMode } from '../src/types';

export default function RootLayout() {
  const [mode, setMode] = useState<ThemeMode>('light');
  const colors = mode === 'light' ? Colors.light : Colors.dark;

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    if (Platform.OS === 'web') {
      document.documentElement.style.scrollBehavior = 'smooth';
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = colors.background;
      document.head.appendChild(meta);
      return () => { document.head.removeChild(meta); };
    }
  }, [colors.background]);

  return (
    <ThemeContext.Provider value={{ mode, colors, toggleTheme }}>
      <StatusBar style={mode === 'light' ? 'dark' : 'light'} />
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeContext.Provider>
  );
}
