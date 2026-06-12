import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SectionWrapper } from '../components/SectionWrapper';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { Fonts, Spacing, BorderRadius } from '../theme';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface SectorData {
  id: string;
  label: string;
  icon: IconName;
  projectCount: number;
  description: string;
  image: string;
}

const SECTORS: SectorData[] = [
  {
    id: 'villa',
    label: 'Villa',
    icon: 'home-roof',
    projectCount: 203,
    description:
      'Lüks villa bahçeleri ve havuzlu peyzaj tasarımlarıyla yaşam alanlarınızı doğayla buluşturuyoruz. Özel tasarım konseptleri, premium bitkilendirme ve akıllı sulama sistemleriyle villanıza değer katıyoruz.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
  },
  {
    id: 'site',
    label: 'Site',
    icon: 'office-building',
    projectCount: 127,
    description:
      'Toplu konut peyzajı ve site içi yeşil alan düzenlemesiyle sakinlerinize huzurlu yaşam alanları sunuyoruz. Ortak kullanım alanları, çocuk parkları ve yürüyüş yolları tasarlıyoruz.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
  },
  {
    id: 'ticari',
    label: 'Ticari',
    icon: 'store',
    projectCount: 86,
    description:
      'Plaza ve iş merkezi çevre düzenlemesiyle kurumsal kimliğinizi dış mekana taşıyoruz. Profesyonel peyzaj tasarımıyla müşterileriniz ve çalışanlarınız üzerinde kalıcı bir izlenim bırakın.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
  },
  {
    id: 'kamu',
    label: 'Kamu',
    icon: 'bank',
    projectCount: 52,
    description:
      'Belediye parkları ve kamusal yeşil alanlar ile şehirlerin nefes almasını sağlıyoruz. Sürdürülebilir tasarım ilkeleriyle toplumun ortak yaşam kalitesini artırıyoruz.',
    image: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=800&h=600&fit=crop',
  },
  {
    id: 'otel',
    label: 'Otel',
    icon: 'bed-outline',
    projectCount: 41,
    description:
      'Resort ve otel peyzajı ile misafirlerinize unutulmaz bir deneyim sunuyoruz. Havuz çevresi tasarımı, tropik bahçeler ve ambient aydınlatma ile lüks konaklama atmosferi yaratıyoruz.',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop',
  },
  {
    id: 'rezidans',
    label: 'Rezidans',
    icon: 'city-variant-outline',
    projectCount: 74,
    description:
      'Modern rezidans çevresi ve premium yaşam alanları tasarlıyoruz. Çatı bahçeleri, lobi peyzajı ve ortak sosyal alanlarla rezidansınızın değerini artırıyoruz.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
  },
  {
    id: 'hobi',
    label: 'Hobi Bahçesi',
    icon: 'sprout',
    projectCount: 95,
    description:
      'Sebze bahçesi ve hobi tarımı alanlarıyla kendi ürünlerinizi yetiştirmenin keyfini yaşayın. Organik bahçecilik prensipleriyle verimli ve estetik bahçeler tasarlıyoruz.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop',
  },
  {
    id: 'teras',
    label: 'Teras',
    icon: 'flower-outline',
    projectCount: 68,
    description:
      'Roof garden ve modern teras peyzajı ile şehrin kalbinde doğayı yaşayın. Saksı düzenlemeleri, dikey bahçeler ve rahatlatıcı oturma alanlarıyla terasınızı yeşil bir vahaya dönüştürüyoruz.',
    image: 'https://images.unsplash.com/photo-1622372738946-62e02505feb3?w=800&h=600&fit=crop',
  },
];

export function CapabilitiesSection() {
  const { colors } = useTheme();
  const { isMobile, isTablet } = useResponsive();
  const [activeId, setActiveId] = useState('villa');
  const scrollRef = useRef<ScrollView>(null);

  const active = SECTORS.find((s) => s.id === activeId) || SECTORS[0];
  const compact = isMobile || isTablet;

  return (
    <SectionWrapper id="hizmet-alanlari" background="custom" customBg="#223740">
      <View style={styles.header}>
        <Text style={styles.overline}>HİZMET ALANLARIMIZ</Text>
        <Text style={[styles.heading, compact && { fontSize: 28, lineHeight: 36 }]}>
          {'Uzmanlığımızdan Faydalanan\nSektörler'}
        </Text>
      </View>

      {/* Mobile: cards first, then image+description */}
      {compact && (
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.mobileCardsRow}
        >
          {SECTORS.map((sector) => (
            <SectorCard
              key={sector.id}
              sector={sector}
              isActive={sector.id === activeId}
              onPress={() => setActiveId(sector.id)}
              compact
            />
          ))}
        </ScrollView>
      )}

      <View style={[styles.mainLayout, compact && styles.mainLayoutMobile]}>
        {/* LEFT — Dynamic Image + Stats */}
        <View style={[styles.imageSection, compact && styles.imageSectionMobile]}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: active.image }}
              style={[
                styles.mainImage,
                Platform.OS === 'web' && {
                  transitionDuration: '500ms',
                  transitionProperty: 'opacity',
                } as any,
              ]}
              resizeMode="cover"
            />
            <View style={styles.imageOverlay}>
              <View style={styles.statBadge}>
                <Text style={styles.statNumber}>{active.projectCount}+</Text>
                <Text style={styles.statLabel}>Tamamlanan Proje</Text>
              </View>
            </View>
          </View>

          <Text
            style={[
              styles.description,
              Platform.OS === 'web' && {
                transitionDuration: '300ms',
                transitionProperty: 'opacity',
              } as any,
            ]}
          >
            {active.description}
          </Text>
        </View>

        {/* RIGHT — Sector Cards (desktop only) */}
        {!compact && (
          <View style={styles.cardsGrid}>
            {SECTORS.map((sector) => (
              <SectorCard
                key={sector.id}
                sector={sector}
                isActive={sector.id === activeId}
                onPress={() => setActiveId(sector.id)}
              />
            ))}
          </View>
        )}
      </View>
    </SectionWrapper>
  );
}

function SectorCard({
  sector,
  isActive,
  onPress,
  compact,
}: {
  sector: SectorData;
  isActive: boolean;
  onPress: () => void;
  compact?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const webHover =
    Platform.OS === 'web'
      ? { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) }
      : {};

  const isHighlight = isActive || hovered;

  return (
    <Pressable
      onPress={onPress}
      {...webHover}
      accessibilityRole="button"
      accessibilityLabel={sector.label}
      accessibilityState={{ selected: isActive }}
      style={[
        styles.card,
        compact && styles.cardCompact,
        {
          backgroundColor: isActive
            ? '#99a537'
            : hovered
              ? 'rgba(153, 165, 55, 0.15)'
              : 'rgba(255,255,255,0.07)',
          borderColor: isActive
            ? '#99a537'
            : hovered
              ? 'rgba(153, 165, 55, 0.4)'
              : 'rgba(255,255,255,0.1)',
          transform: [{ scale: isHighlight ? 1.04 : 1 }],
        },
        Platform.OS === 'web' && {
          transitionDuration: '250ms',
          transitionProperty: 'all',
          cursor: 'pointer',
          boxShadow: isActive
            ? '0 0 24px rgba(153, 165, 55, 0.35), 0 8px 20px rgba(0,0,0,0.15)'
            : hovered
              ? '0 0 16px rgba(153, 165, 55, 0.2), 0 4px 12px rgba(0,0,0,0.1)'
              : '0 2px 8px rgba(0,0,0,0.08)',
        } as any,
      ]}
    >
      <View
        style={[
          styles.cardIconWrap,
          Platform.OS === 'web' && {
            transitionDuration: '250ms',
            transitionProperty: 'transform',
            transform: isHighlight ? 'scale(1.2)' : 'scale(1)',
          } as any,
        ]}
      >
        <MaterialCommunityIcons
          name={sector.icon}
          size={26}
          color={isActive ? '#FFFFFF' : 'rgba(255,255,255,0.85)'}
        />
      </View>
      <Text
        style={[
          styles.cardLabel,
          { color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.9)' },
        ]}
      >
        {sector.label}
      </Text>
      {isActive && (
        <Text style={styles.cardCount}>{sector.projectCount}+ Proje</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: Spacing.xl,
  },
  overline: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.semibold,
    fontSize: Fonts.sizes.sm,
    color: '#99a537',
    letterSpacing: 2,
    marginBottom: Spacing.sm,
  },
  heading: {
    fontFamily: Fonts.headingFamily,
    fontWeight: Fonts.weights.bold,
    fontSize: 40,
    color: '#FFFFFF',
    lineHeight: 50,
  },
  mainLayout: {
    flexDirection: 'row',
    gap: Spacing.xl,
    alignItems: 'flex-start',
  },
  mainLayoutMobile: {
    flexDirection: 'column',
  },
  imageSection: {
    flex: 1,
    gap: Spacing.md,
  },
  imageSectionMobile: {
    width: '100%' as any,
  },
  imageContainer: {
    width: '100%' as any,
    aspectRatio: 4 / 3,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: 'rgba(34, 55, 64, 0.7)',
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.sm,
  },
  statNumber: {
    fontFamily: Fonts.headingFamily,
    fontWeight: Fonts.weights.extrabold,
    fontSize: 36,
    color: '#99a537',
  },
  statLabel: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.medium,
    fontSize: Fonts.sizes.sm,
    color: 'rgba(255,255,255,0.85)',
  },
  description: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.regular,
    fontSize: Fonts.sizes.base,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 26,
  },
  cardsGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  mobileCardsRow: {
    gap: 10,
    paddingBottom: Spacing.lg,
    paddingTop: Spacing.xs,
  },
  card: {
    width: 'calc(50% - 6px)' as any,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.md,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  cardCompact: {
    width: 120,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  cardIconWrap: {
    marginBottom: 2,
  },
  cardLabel: {
    fontFamily: Fonts.headingFamily,
    fontWeight: Fonts.weights.semibold,
    fontSize: Fonts.sizes.sm,
    textAlign: 'center',
  },
  cardCount: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.medium,
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
});
