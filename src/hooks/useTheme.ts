import { createContext, useContext } from 'react';
import { Colors } from '../theme/colors';
import type { ThemeMode } from '../types';

interface ThemeContextType {
  mode: ThemeMode;
  colors: typeof Colors.light;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  colors: Colors.light,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);
