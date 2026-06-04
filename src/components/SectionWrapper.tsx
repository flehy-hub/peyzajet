import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { MaxWidth, Spacing } from '../theme';

interface Props {
  children: React.ReactNode;
  id?: string;
  background?: 'default' | 'alt' | 'dark';
  noPadding?: boolean;
}

export function SectionWrapper({ children, id, background = 'default', noPadding }: Props) {
  const { colors } = useTheme();

  const bg =
    background === 'alt' ? colors.surfaceAlt :
    background === 'dark' ? colors.secondary :
    colors.background;

  const webProps = Platform.OS === 'web' && id ? { id, accessibilityRole: 'region' as const } : {};

  return (
    <View {...webProps} style={[styles.section, { backgroundColor: bg }, noPadding && { paddingVertical: 0 }]}>
      <View style={styles.container}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: Spacing.section,
    paddingHorizontal: Spacing.lg,
  },
  container: {
    maxWidth: MaxWidth.content,
    width: '100%',
    alignSelf: 'center',
  },
});
