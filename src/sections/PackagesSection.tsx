import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SectionWrapper } from '../components/SectionWrapper';
import { SectionTitle } from '../components/SectionTitle';
import { Button } from '../components/Button';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { PACKAGES } from '../constants/data';
import { Fonts, Spacing, BorderRadius } from '../theme';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

const PACKAGE_ICONS: Record<string, IconName> = {
  bronze: 'leaf',
  silver: 'tree',
  gold: 'crown',
};

export function PackagesSection() {
  const { colors } = useTheme();
  const { isMobile, isTablet } = useResponsive();
  const [selectedId, setSelectedId] = useState(PACKAGES[0].id);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const selectedPkg = PACKAGES.find((p) => p.id === selectedId) || PACKAGES[0];
  const compact = isMobile || isTablet;

  return (
    <SectionWrapper id="paketler" background="alt">
      <SectionTitle
        overline="PAKETLERİMİZ"
        title="Özel Peyzaj Paketleri"
        subtitle="Ankara ve çevresine özel bahçe bakım paketleri"
      />

      <View style={[styles.splitLayout, compact && styles.splitLayoutMobile]}>
        {/* LEFT: Tabs */}
        {compact ? (
          <View style={styles.tabsRowMobile}>
            {PACKAGES.map((pkg) => {
              const isActive = pkg.id === selectedId;
              return (
                <Pressable
                  key={pkg.id}
                  onPress={() => setSelectedId(pkg.id)}
                  style={[
                    styles.tabCardMobile,
                    { backgroundColor: isActive ? '#223740' : colors.surface, borderColor: isActive ? '#223740' : colors.border },
                    Platform.OS === 'web' && ({ cursor: 'pointer', transitionDuration: '250ms', transitionProperty: 'all' } as any),
                  ]}
                >
                  <MaterialCommunityIcons name={PACKAGE_ICONS[pkg.id]} size={18} color={isActive ? '#99a537' : colors.textMuted} />
                  <Text style={[styles.tabNameMobile, { color: isActive ? '#FFFFFF' : colors.text }]}>{pkg.name}</Text>
                  <Text style={[styles.tabAreaMobile, { color: isActive ? 'rgba(255,255,255,0.5)' : colors.textMuted }]}>{pkg.area}</Text>
                </Pressable>
              );
            })}
          </View>
        ) : (
          <View style={styles.tabsColumn}>
            {PACKAGES.map((pkg) => {
              const isActive = pkg.id === selectedId;
              const isHovered = hoveredTab === pkg.id;
              const webHover = Platform.OS === 'web' ? {
                onMouseEnter: () => setHoveredTab(pkg.id),
                onMouseLeave: () => setHoveredTab(null),
              } : {};

              return (
                <Pressable
                  key={pkg.id}
                  onPress={() => setSelectedId(pkg.id)}
                  {...webHover}
                  style={[
                    styles.tabCard,
                    {
                      backgroundColor: isActive ? '#223740' : colors.surface,
                      borderColor: isActive ? '#223740' : isHovered ? '#99a537' : colors.border,
                      transform: [{ scale: isActive ? 1.02 : isHovered ? 1.01 : 1 }],
                    },
                    Platform.OS === 'web' && ({
                      cursor: 'pointer',
                      transitionDuration: '250ms',
                      transitionProperty: 'all',
                      boxShadow: isActive ? '0 8px 24px rgba(34,55,64,0.25)' : isHovered ? '0 4px 16px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.04)',
                    } as any),
                  ]}
                >
                  <View style={styles.tabLeft}>
                    <View style={[styles.tabIconWrap, { backgroundColor: isActive ? 'rgba(153,165,55,0.2)' : 'rgba(153,165,55,0.06)' }]}>
                      <MaterialCommunityIcons name={PACKAGE_ICONS[pkg.id]} size={24} color={isActive ? '#99a537' : colors.primary} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.tabName, { color: isActive ? '#FFFFFF' : colors.text }]}>{pkg.name}</Text>
                      <Text style={[styles.tabDesc, { color: isActive ? 'rgba(255,255,255,0.6)' : colors.textMuted }]}>{pkg.area}</Text>
                    </View>
                  </View>
                  <View style={styles.tabRight}>
                    <Text style={[styles.tabPriceRange, { color: isActive ? '#99a537' : colors.text }]}>₺{pkg.priceMin}</Text>
                    <Text style={[styles.tabPriceRangeSm, { color: isActive ? 'rgba(255,255,255,0.4)' : colors.textMuted }]}>– ₺{pkg.priceMax}</Text>
                  </View>
                  {isActive && <View style={styles.activeIndicator} />}
                </Pressable>
              );
            })}
          </View>
        )}

        {/* RIGHT: Detail card */}
        <View style={[styles.detailCard, { backgroundColor: colors.surface }, Platform.OS === 'web' && ({ boxShadow: '0 12px 40px rgba(0,0,0,0.08)' } as any)]}>
          {/* Header */}
          <View style={styles.detailHeader}>
            <View style={styles.detailHeaderLeft}>
              <View style={[styles.detailIconWrap, { backgroundColor: 'rgba(153,165,55,0.12)' }]}>
                <MaterialCommunityIcons name={PACKAGE_ICONS[selectedPkg.id]} size={28} color="#99a537" />
              </View>
              <View>
                <Text style={[styles.detailName, { color: colors.text }]}>{selectedPkg.name}</Text>
                <Text style={[styles.detailSubtext, { color: colors.textMuted }]}>{selectedPkg.area}</Text>
              </View>
            </View>
            <View style={styles.detailPriceWrap}>
              <View style={[styles.frequencyBadge, { backgroundColor: 'rgba(153,165,55,0.12)' }]}>
                <Text style={styles.frequencyText}>{selectedPkg.frequency}</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.detailPrice}>₺{selectedPkg.priceMin}</Text>
                <Text style={[styles.detailPriceDash, { color: colors.textMuted }]}> – </Text>
                <Text style={styles.detailPriceMax}>₺{selectedPkg.priceMax}</Text>
              </View>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          {/* Features */}
          <View style={[styles.featuresGrid, compact && styles.featuresGridMobile]}>
            {selectedPkg.features.map((feature, idx) => (
              <View key={idx} style={[styles.featureRow, compact && styles.featureRowMobile]}>
                <View style={styles.featureCheck}>
                  <MaterialCommunityIcons name="check" size={14} color="#FFFFFF" />
                </View>
                <Text style={[styles.featureText, { color: colors.text }]}>{feature}</Text>
              </View>
            ))}
          </View>

          {/* Info badge */}
          <View style={[styles.infoBadge, { backgroundColor: 'rgba(153,165,55,0.08)' }]}>
            <MaterialCommunityIcons name="information-outline" size={16} color="#99a537" />
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>
              Kesin fiyat, ücretsiz keşif sonrası bahçe durumuna göre belirlenir.
            </Text>
          </View>

          {/* CTA */}
          <View style={styles.ctaRow}>
            <Button title="Ücretsiz Keşif Talep Et" variant="primary" size="lg" icon="arrow" fullWidth />
          </View>
        </View>
      </View>
    </SectionWrapper>
  );
}

const styles = StyleSheet.create({
  splitLayout: {
    flexDirection: 'row',
    gap: Spacing.xl,
    alignItems: 'stretch',
  },
  splitLayoutMobile: {
    flexDirection: 'column',
    gap: Spacing.lg,
  },

  /* Desktop tabs */
  tabsColumn: {
    width: '35%' as any,
    minWidth: 280,
    maxWidth: 360,
    gap: 12,
    flexShrink: 0,
  },
  tabCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  tabLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  tabIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabName: {
    fontFamily: Fonts.headingFamily,
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes.base,
  },
  tabDesc: {
    fontFamily: Fonts.family,
    fontSize: Fonts.sizes.xs,
    marginTop: 2,
  },
  tabRight: {
    alignItems: 'flex-end',
  },
  tabPriceRange: {
    fontFamily: Fonts.headingFamily,
    fontWeight: Fonts.weights.extrabold,
    fontSize: Fonts.sizes.base,
  },
  tabPriceRangeSm: {
    fontFamily: Fonts.family,
    fontSize: 11,
    marginTop: 1,
  },
  activeIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#99a537',
    borderTopLeftRadius: BorderRadius.lg,
    borderBottomLeftRadius: BorderRadius.lg,
  },

  /* Mobile tabs */
  tabsRowMobile: {
    flexDirection: 'row',
    gap: 8,
  } as any,
  tabCardMobile: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  tabNameMobile: {
    fontFamily: Fonts.headingFamily,
    fontWeight: Fonts.weights.bold,
    fontSize: 12,
    textAlign: 'center',
  },
  tabAreaMobile: {
    fontFamily: Fonts.family,
    fontSize: 10,
    textAlign: 'center',
  },

  /* Detail card */
  detailCard: {
    flex: 1,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    overflow: 'hidden',
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  detailHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  detailIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailName: {
    fontFamily: Fonts.headingFamily,
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes.xl,
  },
  detailSubtext: {
    fontFamily: Fonts.family,
    fontSize: Fonts.sizes.sm,
    marginTop: 2,
  },
  detailPriceWrap: {
    alignItems: 'flex-end',
    gap: 4,
  } as any,
  frequencyBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: BorderRadius.full,
  },
  frequencyText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.semibold,
    fontSize: 11,
    color: '#99a537',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  detailPrice: {
    fontFamily: Fonts.headingFamily,
    fontWeight: Fonts.weights.extrabold,
    fontSize: 24,
    color: '#223740',
  },
  detailPriceDash: {
    fontFamily: Fonts.family,
    fontSize: 16,
  },
  detailPriceMax: {
    fontFamily: Fonts.headingFamily,
    fontWeight: Fonts.weights.bold,
    fontSize: 24,
    color: '#99a537',
  },
  divider: {
    height: 1,
    width: '100%' as any,
    marginVertical: Spacing.lg,
  },

  /* Features */
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  featuresGridMobile: {
    flexDirection: 'column',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    width: '48%' as any,
    paddingVertical: 5,
  },
  featureRowMobile: {
    width: '100%' as any,
  },
  featureCheck: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: '#99a537',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.medium,
    fontSize: Fonts.sizes.sm,
    flex: 1,
  },

  /* Info badge */
  infoBadge: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.lg,
  } as any,
  infoText: {
    fontFamily: Fonts.family,
    fontSize: Fonts.sizes.xs,
    lineHeight: 18,
    flex: 1,
  },

  /* CTA */
  ctaRow: {
    marginTop: Spacing.lg,
  },
});
