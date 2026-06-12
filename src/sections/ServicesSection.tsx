import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SectionWrapper } from '../components/SectionWrapper';
import { SectionTitle } from '../components/SectionTitle';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { Fonts, Spacing, BorderRadius } from '../theme';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: '1',
    title: 'Bahçeler ve Göletler',
    description: 'Genellikle yerel bitki ve yaban hayatıyla kusursuz bir şekilde bütünleşmek.',
    icon: 'nature',
  },
  {
    id: '2',
    title: 'Saksıda Bahçecilik',
    description: 'Kaplar, pişmiş toprak, plastik, metal, ahşap gibi çeşitli malzemelerden üretilir.',
    icon: 'flower-tulip-outline',
  },
  {
    id: '3',
    title: 'Organik Bahçecilik',
    description: 'Saman, yaprak ve ağaç kabuğu gibi organik malçlar kullanıyoruz...',
    icon: 'sprout',
  },
  {
    id: '4',
    title: 'Bitki Sağlığı Bakımı',
    description: 'Toprak bileşimini ve pH seviyelerini analiz ediyor ve gerekli uygulamaları yapıyoruz.',
    icon: 'tree-outline',
  },
  {
    id: '5',
    title: 'Çim Bakımı',
    description: 'Çimlerinizin farklı zamanlardaki özel ihtiyaçlarını tasarladık...',
    icon: 'grass',
  },
  {
    id: '6',
    title: 'Peyzaj Düzenlemesi',
    description: 'İrade zayıflığı nedeniyle üstlenilen görev, yani...',
    icon: 'wall',
  },
];

export function ServicesSection() {
  const { isMobile, isTablet } = useResponsive();
  const cols = isMobile ? 1 : isTablet ? 2 : 3;
  const [openId, setOpenId] = useState<string>('1');

  return (
    <SectionWrapper id="hizmetler" background="alt">
      <SectionTitle
        overline="HİZMETLER"
        title="Özelleştirilmiş Peyzaj Hizmetleri"
      />

      {isMobile ? (
        <View style={styles.accordionList}>
          {SERVICES_DATA.map((service) => (
            <AccordionItem
              key={service.id}
              service={service}
              isOpen={openId === service.id}
              onToggle={() => setOpenId(openId === service.id ? '' : service.id)}
            />
          ))}
        </View>
      ) : (
        <View style={styles.grid}>
          {SERVICES_DATA.map((service, index) => (
            <ServiceCard key={service.id} service={service} cols={cols} index={index} />
          ))}
        </View>
      )}
    </SectionWrapper>
  );
}

/* ── Accordion (mobile) ── */
function AccordionItem({
  service,
  isOpen,
  onToggle,
}: {
  service: ServiceItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.accordionCard,
        {
          backgroundColor: colors.surface,
          borderColor: isOpen ? colors.primary : colors.border,
        },
        Platform.OS === 'web' && ({
          boxShadow: isOpen
            ? '0 4px 16px rgba(153, 165, 55, 0.12)'
            : '0 1px 4px rgba(0,0,0,0.04)',
        } as any),
      ]}
    >
      <Pressable
        onPress={onToggle}
        style={styles.accordionHeader}
        accessibilityRole="button"
      >
        <View style={[styles.accordionIconWrap, { backgroundColor: isOpen ? 'rgba(153,165,55,0.12)' : 'rgba(153,165,55,0.06)' }]}>
          <MaterialCommunityIcons name={service.icon} size={22} color={colors.primary} />
        </View>
        <Text style={[styles.accordionTitle, { color: colors.text }]} numberOfLines={1}>
          {service.title}
        </Text>
        <MaterialCommunityIcons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={22}
          color={isOpen ? colors.primary : colors.textMuted}
        />
      </Pressable>

      {isOpen && (
        <View style={styles.accordionBody}>
          <View style={[styles.accordionDivider, { backgroundColor: colors.border }]} />
          <Text style={[styles.accordionDesc, { color: colors.textSecondary }]}>
            {service.description}
          </Text>
          <View style={styles.accordionCta}>
            <Text style={[styles.accordionCtaText, { color: colors.primary }]}>
              ŞİMDİ FİYAT TEKLİFİNİZİ ALIN
            </Text>
            <View style={[styles.accordionCtaArrow, { backgroundColor: colors.primary }]}>
              <MaterialCommunityIcons name="arrow-top-right" size={12} color="#FFFFFF" />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

/* ── Card (desktop/tablet) ── */
function ServiceCard({
  service,
  cols,
  index,
}: {
  service: ServiceItem;
  cols: number;
  index: number;
}) {
  const { colors } = useTheme();
  const [hovered, setHovered] = useState(false);

  const webHover =
    Platform.OS === 'web'
      ? { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) }
      : {};

  const widthPercent = cols === 2 ? '48.5%' : '31.8%';

  return (
    <View
      {...webHover}
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          width: widthPercent as any,
          borderColor: hovered ? colors.primary : colors.border,
          transform: [{ translateY: hovered ? -6 : 0 }],
        },
        Platform.OS === 'web' && {
          boxShadow: hovered
            ? '0 16px 40px rgba(0,0,0,0.10)'
            : '0 2px 8px rgba(0,0,0,0.04)',
        } as any,
      ]}
    >
      <View style={styles.topSection}>
        <View style={styles.titleRow}>
          <View style={[styles.playIcon, { backgroundColor: hovered ? colors.primary : colors.secondary }]}>
            <MaterialCommunityIcons name="play" size={10} color="#FFFFFF" />
          </View>
          <Text style={[styles.cardTitle, { color: colors.text }]} numberOfLines={2}>
            {service.title}
          </Text>
        </View>

        <View
          style={[
            styles.iconCircle,
            {
              backgroundColor: hovered ? 'rgba(153,165,55,0.12)' : 'rgba(153,165,55,0.05)',
            },
            Platform.OS === 'web' && {
              transform: hovered ? 'rotate(8deg) scale(1.05)' : 'rotate(0deg) scale(1)',
            } as any,
          ]}
        >
          <MaterialCommunityIcons name={service.icon} size={28} color={colors.primary} />
        </View>
      </View>

      <View style={styles.ctaRow}>
        <View>
          <Text style={[styles.ctaLabel, { color: colors.primary }]}>ŞİMDİ FİYAT</Text>
          <Text style={[styles.ctaLabel, { color: colors.primary }]}>TEKLİFİNİZİ ALIN</Text>
        </View>
        <View
          style={[
            styles.ctaArrow,
            {
              borderColor: hovered ? colors.primary : colors.border,
              backgroundColor: hovered ? colors.primary : 'transparent',
            },
          ]}
        >
          <MaterialCommunityIcons name="arrow-top-right" size={14} color={hovered ? '#FFFFFF' : colors.textMuted} />
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      <Text style={[styles.cardDesc, { color: colors.textSecondary }]}>
        {service.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  /* ── Grid (desktop) ── */
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 20,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transitionDuration: '300ms',
        transitionProperty: 'transform, box-shadow, border-color',
      } as any,
    }),
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    marginRight: 12,
  },
  playIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        transitionDuration: '300ms',
        transitionProperty: 'background-color',
      } as any,
    }),
  },
  cardTitle: {
    fontFamily: Fonts.headingFamily,
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes.lg,
    flex: 1,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        transitionDuration: '300ms',
        transitionProperty: 'transform, background-color',
      } as any,
    }),
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  ctaLabel: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.semibold,
    fontSize: 11,
    letterSpacing: 1,
    lineHeight: 16,
  },
  ctaArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        transitionDuration: '200ms',
        transitionProperty: 'all',
      } as any,
    }),
  },
  divider: {
    height: 1,
    width: '100%',
    marginBottom: 16,
  },
  cardDesc: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.regular,
    fontSize: Fonts.sizes.sm,
    lineHeight: 22,
  },

  /* ── Accordion (mobile) ── */
  accordionList: {
    gap: 10,
  },
  accordionCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        transitionDuration: '250ms',
        transitionProperty: 'border-color, box-shadow',
      } as any,
    }),
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  accordionIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accordionTitle: {
    fontFamily: Fonts.headingFamily,
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes.base,
    flex: 1,
  },
  accordionBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  accordionDivider: {
    height: 1,
    width: '100%' as any,
    marginBottom: 12,
  },
  accordionDesc: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.regular,
    fontSize: Fonts.sizes.sm,
    lineHeight: 22,
    marginBottom: 14,
  },
  accordionCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  accordionCtaText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.semibold,
    fontSize: 11,
    letterSpacing: 1,
  },
  accordionCtaArrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
