import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform, Linking, Image, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { Logo } from './Logo';
import { Fonts, Spacing, MaxWidth, BorderRadius } from '../theme';
import { NAV_LINKS, CONTACT_INFO } from '../constants/data';
import { scrollToId } from '../utils/pageScroll';

const SOCIAL_LINKS = [
  { icon: 'facebook' as const, url: '#' },
  { icon: 'instagram' as const, url: '#' },
  { icon: 'youtube' as const, url: '#' },
  { icon: 'linkedin' as const, url: '#' },
];

const DARK_BG = '#223740';
const OLIVE = '#99a537';

const WORKING_HOURS = [
  { day: 'Pazartesi', hours: '08:00 - 18:00' },
  { day: 'Salı', hours: '08:00 - 18:00' },
  { day: 'Çarşamba', hours: '08:00 - 18:00' },
  { day: 'Perşembe', hours: '08:00 - 18:00' },
  { day: 'Cuma', hours: '08:00 - 18:00' },
  { day: 'Cumartesi', hours: '09:00 - 15:00' },
  { day: 'Pazar', hours: 'Kapalı' },
];

const SIRKET_LINKS = [
  { label: 'Hakkımızda', href: '#hakkimizda' },
  { label: 'Ekibimiz', href: '#ekibimiz' },
  { label: 'Projeler', href: '#projeler' },
  { label: 'Blog', href: '#blog' },
  { label: 'İletişim', href: '#iletisim' },
];

const HIZMET_LINKS = ['Bahçe Tasarımı', 'Peyzaj Projelendirme', 'Sulama Sistemleri', 'Bahçe Bakımı'];

const BOTTOM_LINKS = ['Gizlilik Politikası', 'Kullanım Koşulları', 'Çerez Politikası', 'Site Haritası'];

export function Footer() {
  const { colors } = useTheme();
  const { isMobile } = useResponsive();

  const scrollToSection = (href: string) => {
    if (Platform.OS === 'web') scrollToId(href.replace('#', ''));
  };

  return (
    <View style={{ backgroundColor: DARK_BG }} {...(Platform.OS === 'web' ? { dataSet: { fabAvoid: '1' } } : {})}>
      {/* ===== TOP SECTION: Contact + Image + Newsletter ===== */}
      <View style={[styles.topSection, { paddingHorizontal: Spacing.lg }]}>
        <View style={[styles.topInner, { flexDirection: isMobile ? 'column' : 'row' }]}>
          {/* Left: Contact Info */}
          <View style={[styles.topLeft, { flex: 1 }]}>
            <Text style={styles.overline}>İLETİŞİM</Text>
            <Text style={styles.topHeading}>
              {'Hayalinizdeki Bahçe İçin\nBize Ulaşın'}
            </Text>
            <Pressable onPress={() => Linking.openURL(`tel:${CONTACT_INFO.phone}`)}>
              <Text style={styles.topPhone}>{CONTACT_INFO.phone}</Text>
            </Pressable>
            <Pressable onPress={() => Linking.openURL(`mailto:${CONTACT_INFO.email}`)}>
              <Text style={styles.topDetail}>{CONTACT_INFO.email}</Text>
            </Pressable>
            <Text style={styles.topDetail}>{CONTACT_INFO.address}</Text>
          </View>

          {/* Right: Image + Newsletter */}
          <View style={[styles.topRight, { flex: 1 }]}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80' }}
              style={styles.topImage}
              resizeMode="cover"
            />
            {/* Newsletter strip */}
            <View style={styles.newsletterStrip}>
              <Text style={styles.newsletterText}>
                Peyzaj dünyasındaki güncellemelerden haberdar olun
              </Text>
              {Platform.OS === 'web' ? (
                <View style={styles.newsletterInputRow}>
                  <TextInput
                    placeholder="E-posta adresiniz"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    style={styles.newsletterInput}
                  />
                  <Pressable style={styles.newsletterButton}>
                    <Text style={styles.newsletterButtonText}>Abone Ol</Text>
                  </Pressable>
                </View>
              ) : (
                <View style={styles.newsletterInputRow}>
                  <TextInput
                    placeholder="E-posta adresiniz"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    style={styles.newsletterInput}
                  />
                  <Pressable style={styles.newsletterButton}>
                    <Text style={styles.newsletterButtonText}>Abone Ol</Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* ===== BOTTOM SECTION: 4 Columns ===== */}
      <View style={[styles.bottomSection, { paddingHorizontal: Spacing.lg }]}>
        <View style={[styles.bottomInner, { flexDirection: isMobile ? 'column' : 'row' }]}>
          {/* Col 1: Logo + desc + social */}
          <View style={[styles.col, { maxWidth: isMobile ? '100%' as any : 280 }]}>
            <Logo color="#FFFFFF" size={24} />
            <Text style={styles.desc}>
              Profesyonel peyzaj tasarımı, bahçe düzenleme ve bakım hizmetleri ile hayalinizdeki bahçeyi gerçeğe dönüştürüyoruz.
            </Text>
            <View style={styles.socialRow}>
              {SOCIAL_LINKS.map((s) => (
                <Pressable key={s.icon} onPress={() => Linking.openURL(s.url)} style={styles.socialIcon}>
                  <MaterialCommunityIcons name={s.icon} size={18} color="#FFFFFF" />
                </Pressable>
              ))}
            </View>
          </View>

          {/* Col 2: Şirket */}
          <View style={styles.col}>
            <Text style={styles.colTitle}>Şirket</Text>
            {SIRKET_LINKS.map((link) => (
              <Pressable key={link.href} onPress={() => scrollToSection(link.href)} style={styles.footerLink}>
                <Text style={styles.linkText}>{link.label}</Text>
              </Pressable>
            ))}
          </View>

          {/* Col 3: Hizmetler */}
          <View style={styles.col}>
            <Text style={styles.colTitle}>Hizmetler</Text>
            {HIZMET_LINKS.map((s) => (
              <Text key={s} style={styles.linkText}>{s}</Text>
            ))}
          </View>

          {/* Col 4: Çalışma Saatleri */}
          <View style={styles.col}>
            <Text style={styles.colTitle}>Çalışma Saatleri</Text>
            {WORKING_HOURS.map((item) => (
              <View key={item.day} style={styles.hoursRow}>
                <Text style={styles.linkText}>{item.day}</Text>
                <Text style={[styles.linkText, { color: item.hours === 'Kapalı' ? '#e05555' : 'rgba(255,255,255,0.7)' }]}>
                  {item.hours}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* ===== COPYRIGHT BAR ===== */}
      <View style={styles.copyrightBar}>
        <View style={[styles.copyrightInner, { flexDirection: isMobile ? 'column' : 'row' }]}>
          <Text style={styles.copyright}>
            © 2026 Peyzajet. Tüm hakları saklıdır.
          </Text>
          <View style={[styles.copyrightLinks, { marginTop: isMobile ? Spacing.sm : 0 }]}>
            {BOTTOM_LINKS.map((link, i) => (
              <React.Fragment key={link}>
                <Pressable style={styles.footerLink}>
                  <Text style={styles.copyrightLinkText}>{link}</Text>
                </Pressable>
                {i < BOTTOM_LINKS.length - 1 && (
                  <Text style={styles.copyrightSep}>|</Text>
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  /* TOP SECTION */
  topSection: {
    paddingTop: Spacing['3xl'],
    paddingBottom: Spacing['2xl'],
  },
  topInner: {
    maxWidth: MaxWidth.content,
    width: '100%',
    alignSelf: 'center',
    gap: Spacing['2xl'],
  },
  topLeft: {
    gap: Spacing.md,
    justifyContent: 'center',
  },
  overline: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.semibold,
    fontSize: Fonts.sizes.sm,
    color: OLIVE,
    letterSpacing: 2,
    marginBottom: Spacing.xs,
  },
  topHeading: {
    fontFamily: Fonts.headingFamily,
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes['2xl'],
    color: '#FFFFFF',
    lineHeight: 40,
  },
  topPhone: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.semibold,
    fontSize: Fonts.sizes.lg,
    color: OLIVE,
    marginTop: Spacing.sm,
  },
  topDetail: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.regular,
    fontSize: Fonts.sizes.sm,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 22,
  },
  topRight: {
    gap: Spacing.md,
  },
  topImage: {
    width: '100%',
    height: 220,
    borderRadius: BorderRadius.lg,
  },

  /* NEWSLETTER */
  newsletterStrip: {
    backgroundColor: OLIVE,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  newsletterText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.medium,
    fontSize: Fonts.sizes.sm,
    color: '#FFFFFF',
  },
  newsletterInputRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  newsletterInput: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    color: '#FFFFFF',
    fontFamily: Fonts.family,
    fontSize: Fonts.sizes.sm,
    ...Platform.select({ web: { outlineStyle: 'none' } as any }),
  },
  newsletterButton: {
    backgroundColor: DARK_BG,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({ web: { cursor: 'pointer' } as any }),
  },
  newsletterButtonText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.semibold,
    fontSize: Fonts.sizes.sm,
    color: '#FFFFFF',
  },

  /* BOTTOM SECTION */
  bottomSection: {
    paddingVertical: Spacing['2xl'],
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  bottomInner: {
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
    fontFamily: Fonts.headingFamily,
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
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },

  /* COPYRIGHT */
  copyrightBar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  copyrightInner: {
    maxWidth: MaxWidth.content,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  copyright: {
    fontFamily: Fonts.family,
    fontSize: Fonts.sizes.sm,
    color: 'rgba(255,255,255,0.5)',
  },
  copyrightLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  copyrightLinkText: {
    fontFamily: Fonts.family,
    fontSize: Fonts.sizes.sm,
    color: 'rgba(255,255,255,0.5)',
  },
  copyrightSep: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: Fonts.sizes.sm,
  },
});
