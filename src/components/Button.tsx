import React, { useState } from 'react';
import { Pressable, Text, View, StyleSheet, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { Fonts, BorderRadius, Spacing } from '../theme';

interface Props {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  size?: 'sm' | 'md' | 'lg';
  icon?: 'arrow' | 'phone';
  fullWidth?: boolean;
}

export function Button({ title, onPress, variant = 'primary', size = 'md', icon, fullWidth }: Props) {
  const { colors } = useTheme();
  const [hovered, setHovered] = useState(false);

  const bgColor =
    variant === 'primary' ? (hovered ? colors.primaryDark : colors.primary) :
    variant === 'secondary' ? (hovered ? '#1a2c32' : colors.secondary) :
    variant === 'white' ? (hovered ? '#F0F0EB' : '#FFFFFF') :
    'transparent';

  const textColor =
    variant === 'outline' ? colors.primary :
    variant === 'white' ? colors.secondary :
    '#FFFFFF';

  const borderColor = variant === 'outline' ? colors.primary : 'transparent';

  const paddingV = size === 'sm' ? 10 : size === 'lg' ? 18 : 14;
  const paddingH = size === 'sm' ? 20 : size === 'lg' ? 36 : 28;
  const fontSize = size === 'sm' ? Fonts.sizes.sm : size === 'lg' ? Fonts.sizes.md : Fonts.sizes.base;

  const webHover = Platform.OS === 'web' ? {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  } : {};

  const iconName = icon === 'arrow' ? 'arrow-right' : icon === 'phone' ? 'phone' : null;
  const displayText = title;

  return (
    <Pressable
      onPress={onPress}
      {...webHover}
      style={[
        styles.button,
        {
          backgroundColor: bgColor,
          borderColor,
          paddingVertical: paddingV,
          paddingHorizontal: paddingH,
          transform: [{ scale: hovered ? 1.03 : 1 }],
          width: fullWidth ? '100%' : undefined,
        },
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        {iconName === 'phone' && <MaterialCommunityIcons name="phone" size={fontSize} color={textColor} />}
        <Text style={[styles.text, { color: textColor, fontSize }]}>
          {displayText}
        </Text>
        {iconName === 'arrow-right' && <MaterialCommunityIcons name="arrow-right" size={fontSize} color={textColor} />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transitionDuration: '200ms',
        transitionProperty: 'all',
      } as any,
    }),
  },
  text: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.semibold,
  },
});
