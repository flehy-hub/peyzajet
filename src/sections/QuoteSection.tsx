import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Platform, Pressable } from 'react-native';
import { SectionWrapper } from '../components/SectionWrapper';
import { SectionTitle } from '../components/SectionTitle';
import { Button } from '../components/Button';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { calculateQuote, formatPrice } from '../utils/quoteCalculator';
import { Fonts, Spacing, BorderRadius } from '../theme';
import type { QuoteFormData } from '../types';

const SERVICE_TYPES = ['Peyzaj Tasarımı', 'Çim Uygulaması', 'Sulama Sistemi', 'Komple Bahçe'];
const GARDEN_TYPES = ['Villa', 'Site', 'İş Yeri', 'Hobi Bahçesi'];
const PLANT_DENSITIES = ['Az', 'Orta', 'Yoğun'];

export function QuoteSection() {
  const { colors } = useTheme();
  const { isMobile } = useResponsive();

  const [formData, setFormData] = useState<QuoteFormData>({
    area: 200,
    serviceType: 'Komple Bahçe',
    gardenType: 'Villa',
    plantDensity: 'Orta',
    hasLighting: false,
    hasIrrigation: false,
  });

  const quote = useMemo(() => calculateQuote(formData), [formData]);

  const update = <K extends keyof QuoteFormData>(key: K, value: QuoteFormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SectionWrapper id="maliyet-hesapla" background="alt">
      <SectionTitle
        overline="Maliyet Hesaplama"
        title="Ücretsiz Maliyet Hesaplama"
        subtitle="Bahçenizin yaklaşık maliyetini hemen öğrenin"
      />

      <View style={[styles.wrapper, { flexDirection: isMobile ? 'column' : 'row' }]}>
        <View style={[styles.formSide, { backgroundColor: colors.surface }]}>
          {/* Area Slider */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.text }]}>
              Bahçe Alanı: <Text style={{ color: colors.primary, fontWeight: '700' }}>{formData.area} m²</Text>
            </Text>
            <View style={styles.sliderTrack}>
              <View style={[styles.sliderFill, { width: `${((formData.area - 50) / 950) * 100}%`, backgroundColor: colors.primary }]} />
              {Platform.OS === 'web' && (
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="10"
                  value={formData.area}
                  onChange={(e: any) => update('area', Number(e.target.value))}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                    margin: 0,
                  } as any}
                />
              )}
            </View>
            <View style={styles.sliderLabels}>
              <Text style={[styles.sliderLabel, { color: colors.textMuted }]}>50 m²</Text>
              <Text style={[styles.sliderLabel, { color: colors.textMuted }]}>1000 m²</Text>
            </View>
          </View>

          {/* Service Type */}
          <OptionGroup
            label="Hizmet Türü"
            options={SERVICE_TYPES}
            selected={formData.serviceType}
            onSelect={(v) => update('serviceType', v)}
          />

          {/* Garden Type */}
          <OptionGroup
            label="Bahçe Tipi"
            options={GARDEN_TYPES}
            selected={formData.gardenType}
            onSelect={(v) => update('gardenType', v)}
          />

          {/* Plant Density */}
          <OptionGroup
            label="Bitki Yoğunluğu"
            options={PLANT_DENSITIES}
            selected={formData.plantDensity}
            onSelect={(v) => update('plantDensity', v)}
          />

          {/* Toggles */}
          <View style={[styles.field, { flexDirection: 'row', gap: Spacing.md }]}>
            <ToggleButton
              label="Aydınlatma"
              active={formData.hasLighting}
              onPress={() => update('hasLighting', !formData.hasLighting)}
            />
            <ToggleButton
              label="Sulama Sistemi"
              active={formData.hasIrrigation}
              onPress={() => update('hasIrrigation', !formData.hasIrrigation)}
            />
          </View>
        </View>

        {/* Result Side */}
        <View style={[styles.resultSide, { backgroundColor: colors.secondary }]}>
          <Text style={styles.resultTitle}>Tahmini Maliyet</Text>
          <View style={styles.resultDivider} />

          <PriceRow label="Minimum" value={quote.min} />
          <PriceRow label="Ortalama" value={quote.avg} highlight />
          <PriceRow label="Maksimum" value={quote.max} />

          <View style={styles.resultDivider} />

          <Text style={styles.resultNote}>
            * Fiyatlar tahminidir. Kesin fiyat için ücretsiz keşif talep edin.
          </Text>

          <View style={{ marginTop: Spacing.lg }}>
            <Button title="Ücretsiz Teklif Al" variant="primary" size="lg" />
          </View>
        </View>
      </View>
    </SectionWrapper>
  );
}

function OptionGroup({ label, options, selected, onSelect }: {
  label: string;
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
}) {
  const { colors } = useTheme();

  return (
    <View style={styles.field}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <View style={styles.optionRow}>
        {options.map((opt) => {
          const active = selected === opt;
          return (
            <Pressable
              key={opt}
              onPress={() => onSelect(opt)}
              style={[
                styles.optionChip,
                {
                  backgroundColor: active ? colors.primary : colors.surfaceAlt,
                  borderColor: active ? colors.primary : colors.border,
                },
              ]}
            >
              <Text style={[
                styles.optionText,
                { color: active ? '#FFFFFF' : colors.textSecondary },
              ]}>
                {opt}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function ToggleButton({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.toggleBtn,
        {
          backgroundColor: active ? colors.primary : colors.surfaceAlt,
          borderColor: active ? colors.primary : colors.border,
        },
      ]}
    >
      <Text style={{ color: active ? '#FFF' : colors.textSecondary, fontFamily: Fonts.family, fontWeight: '600', fontSize: 13 }}>
        {active ? '✓' : '✕'} {label}
      </Text>
    </Pressable>
  );
}

function PriceRow({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <View style={styles.priceRow}>
      <Text style={[styles.priceLabel, highlight && { color: '#6FA43A' }]}>{label}</Text>
      <Text style={[styles.priceValue, highlight && { color: '#6FA43A', fontSize: 28 }]}>
        ₺{formatPrice(value)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: Spacing.lg,
    alignItems: 'stretch',
  },
  formSide: {
    flex: 2,
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
    ...Platform.select({
      web: { boxShadow: '0 4px 20px rgba(0,0,0,0.06)' } as any,
    }),
  },
  resultSide: {
    flex: 1,
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
    justifyContent: 'center',
  },
  field: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.semibold,
    fontSize: Fonts.sizes.sm,
    marginBottom: Spacing.sm,
  },
  sliderTrack: {
    height: 8,
    backgroundColor: '#E0E0DB',
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  sliderFill: {
    height: '100%',
    borderRadius: 4,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
  },
  sliderLabel: {
    fontFamily: Fonts.family,
    fontSize: 11,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  optionChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    ...Platform.select({ web: { cursor: 'pointer', transitionDuration: '200ms', transitionProperty: 'all' } as any }),
  },
  optionText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.medium,
    fontSize: Fonts.sizes.sm,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
    ...Platform.select({ web: { cursor: 'pointer', transitionDuration: '200ms', transitionProperty: 'all' } as any }),
  },
  resultTitle: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes.xl,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  resultDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginVertical: Spacing.md,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  priceLabel: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.medium,
    fontSize: Fonts.sizes.base,
    color: 'rgba(255,255,255,0.7)',
  },
  priceValue: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes.xl,
    color: '#FFFFFF',
  },
  resultNote: {
    fontFamily: Fonts.family,
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    lineHeight: 18,
  },
});
