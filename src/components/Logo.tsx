import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Fonts } from '../theme';

interface Props {
  color?: string;
  size?: number;
}

export function Logo({ color = '#1F3A2E', size = 28 }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={[styles.leafOuter, { borderColor: '#6FA43A' }]}>
          <View style={[styles.leafInner, { backgroundColor: '#6FA43A' }]} />
        </View>
      </View>
      <View>
        <Text style={[styles.brand, { color, fontSize: size }]}>
          PEYZAJET
        </Text>
        <Text style={[styles.tagline, { color, fontSize: size * 0.32, opacity: 0.7 }]}>
          PEYZAJ & BAHÇE HİZMETLERİ
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconContainer: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leafOuter: {
    width: 32,
    height: 32,
    borderWidth: 2.5,
    borderRadius: 16,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '45deg' }],
  },
  leafInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 2,
  },
  brand: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.extrabold,
    letterSpacing: 2,
  },
  tagline: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.medium,
    letterSpacing: 1.5,
    marginTop: -2,
  },
});
