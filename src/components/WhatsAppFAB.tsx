import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, Platform, Linking } from 'react-native';
import { CONTACT_INFO } from '../constants/data';

export function WhatsAppFAB() {
  const [hovered, setHovered] = useState(false);
  const webHover = Platform.OS === 'web' ? {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  } : {};

  return (
    <Pressable
      onPress={() => Linking.openURL(`https://wa.me/${CONTACT_INFO.whatsapp}`)}
      {...webHover}
      style={[
        styles.fab,
        { transform: [{ scale: hovered ? 1.1 : 1 }] },
      ]}
    >
      <Text style={styles.icon}>💬</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: Platform.OS === 'web' ? ('fixed' as any) : 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#25D366',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        boxShadow: '0 4px 16px rgba(37, 211, 102, 0.4)',
        transitionDuration: '200ms',
        transitionProperty: 'transform',
      } as any,
    }),
  },
  icon: {
    fontSize: 28,
  },
});
