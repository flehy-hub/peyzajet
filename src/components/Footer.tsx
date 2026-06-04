import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform, Linking } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { Logo } from './Logo';
import { Fonts, Spacing, MaxWidth, BorderRadius } from '../theme';
import { NAV_LINKS, CONTACT_INFO } from '../constants/data';

export function Footer() {
  const { colors } = useTheme();
  const { isMobile } = useResponsive();

  const scrollToSection = (href: string) => {
    if (Platform.OS === 'web') {
      const id = href.replace('#', '');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <View style={[styles.footer, { backgroundColor: colors.secondary }]}>
      <View style={[styles.inner, { flexDirection: isMobile ? 'column' : 'row' }]}>
        <View style={[styles.col, { maxWidth: isMobile ? '100%' : 320 }]}>
          <Logo color="#FFFFFF" size={24} />
          <Text style={styles.desc}>
            Profesyonel peyzaj tasarımı, bahçe düzenleme ve bakım hizmetleri ile hayalinizdeki bahçeyi gerçeğe dönüştürüyoruz.
          </Text>
          <View style={styles.socialRow}>
            {['FB', 'IG', 'YT', 'LI'].map((s) => (
              <Pressable key={s} style={styles.socialIcon}>
                <Text style={styles.socialText}>{s}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.col}>
          <Text style={styles.colTitle}>Hızlı Bağlantılar</Text>
          {NAV_LINKS.map((link) => (
            <Pressable key={link.href} onPress={() => scrollToSection(link.href)} style={styles.footerLink}>
              <Text style={styles.linkText}>{link.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.col}>
          <Text style={styles.colTitle}>Hizmetlerimiz</Text>
          {['Bahçe Tasarımı', 'Peyzaj Projelendirme', 'Sulama Sistemleri', 'Bahçe Bakımı'].map((s) => (
            <Text key={s} style={styles.linkText}>{s}</Text>
          ))}
        </View>

        <View style={styles.col}>
          <Text style={styles.colTitle}>İletişim</Text>
          <Text style={styles.linkText}>{CONTACT_INFO.address}</Text>
          <Pressable onPress={() => Linking.openURL(`tel:${CONTACT_INFO.phone}`)}>
            <Text style={[styles.linkText, { color: '#6FA43A' }]}>{CONTACT_INFO.phone}</Text>
          </Pressable>
          <Pressable onPress={() => Linking.openURL(`mailto:${CONTACT_INFO.email}`)}>
            <Text style={[styles.linkText, { color: '#6FA43A' }]}>{CONTACT_INFO.email}</Text>
          </Pressable>
          <Text style={styles.linkText}>{CONTACT_INFO.workingHours}</Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.copyright}>
          {'©'} 2026 Peyzajet. T{'ü'}m haklar{'ı'} sakl{'ı'}d{'ı'}r.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingTop: Spacing['3xl'],
    paddingHorizontal: Spacing.lg,
  },
  inner: {
    maxWidth: MaxWidth.content,
    width: '100%',
    alignSelf: 'center',
    gap: Spacing['2xl'],
  },
  col: {
    flex: 1,
    gap: Spacing.sm,
  },
  colTitle: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes.md,
    color: '#FFFFFF',
    marginBottom: Spacing.sm,
  },
  desc: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.regular,
    fontSize: Fonts.sizes.sm,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 22,
    marginTop: Spacing.md,
  },
  socialRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  socialIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({ web: { cursor: 'pointer' } as any }),
  },
  socialText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  footerLink: {
    ...Platform.select({ web: { cursor: 'pointer' } as any }),
  },
  linkText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.regular,
    fontSize: Fonts.sizes.sm,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 24,
  },
  bottom: {
    maxWidth: MaxWidth.content,
    width: '100%',
    alignSelf: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    marginTop: Spacing['2xl'],
    paddingVertical: Spacing.lg,
    alignItems: 'center',
  },
  copyright: {
    fontFamily: Fonts.family,
    fontSize: Fonts.sizes.sm,
    color: 'rgba(255,255,255,0.5)',
  },
});
