import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SectionWrapper } from '../components/SectionWrapper';
import { SectionTitle } from '../components/SectionTitle';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { Fonts, Spacing, BorderRadius } from '../theme';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface ProcessStep {
  step: number;
  title: string;
  icon: IconName;
  description: string;
  details: string[];
  duration: string;
}

const STEPS: ProcessStep[] = [
  {
    step: 1,
    title: 'Ücretsiz Keşif & Analiz',
    icon: 'magnify-scan',
    description: 'Projenizin temellerini atıyoruz. Alanınızı yerinde inceleyerek ihtiyaçlarınızı, beklentilerinizi ve arazinin özelliklerini detaylıca belirliyoruz.',
    details: [
      'Arazi ölçümü ve toprak analizi',
      'Mevcut bitki envanteri çıkarılması',
      'Güneş, rüzgar ve drenaj haritası',
      'Müşteri beklenti ve bütçe görüşmesi',
      'Fotoğraf ve video ile belgeleme',
    ],
    duration: '1–2 Gün',
  },
  {
    step: 2,
    title: 'Tasarım & 3D Projelendirme',
    icon: 'pencil-ruler',
    description: 'Peyzaj mimarlarımız keşif verilerine göre projenizi tasarlıyor. 3D görselleştirme ile bahçenizi uygulamadan önce görmenizi sağlıyoruz.',
    details: [
      'Konsept tasarım ve mood board hazırlığı',
      '3D modelleme ile gerçekçi görselleştirme',
      'Bitki seçim planı ve mevsimsel çiçeklenme takvimi',
      'Aydınlatma ve sulama sistem planlaması',
      'Malzeme ve maliyet detay raporu',
      'Revizyon turları ile onay süreci',
    ],
    duration: '5–10 Gün',
  },
  {
    step: 3,
    title: 'Profesyonel Uygulama',
    icon: 'hammer-wrench',
    description: 'Onaylanan projeyi uzman ekibimizle sahada hayata geçiriyoruz. Her aşamada kalite kontrolü yapıyor, sizi süreç hakkında bilgilendiriyoruz.',
    details: [
      'Altyapı: Drenaj, sulama ve elektrik tesisatı',
      'Sert zemin: Yürüyüş yolları, taş döşeme, deck',
      'Yumuşak zemin: Çim, bitkilendirme, toprak düzenleme',
      'Yapısal elemanlar: Pergola, kamelya, aydınlatma',
      'Günlük ilerleme raporları ve fotoğraflar',
      'Proje müdürü ile birebir iletişim',
    ],
    duration: '2–8 Hafta',
  },
  {
    step: 4,
    title: 'Teslim, Bakım & Garanti',
    icon: 'shield-check-outline',
    description: 'Projeyi teslim ettikten sonra yanınızdayız. Düzenli bakım programlarımız ve garanti kapsamımızla bahçeniz her mevsim kusursuz kalır.',
    details: [
      'Detaylı teslim tutanağı ve kullanım kılavuzu',
      'Bitki ve çim adaptasyon takibi (ilk 30 gün)',
      'Mevsimlik budama, gübreleme ve ilaçlama',
      'Sulama sistemi bakım ve kış koruması',
      '1 yıl bitki değişim garantisi',
      'Acil müdahale: 24 saat içinde geri dönüş',
    ],
    duration: '12 Ay+',
  },
];

export function ProcessSection() {
  const { colors } = useTheme();
  const { isMobile } = useResponsive();
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <SectionWrapper id="surec">
      <SectionTitle
        overline="Nasıl Çalışıyoruz"
        title="4 Adımda Bahçeniz Hazır"
        subtitle="Profesyonel sürecimizle hayalinizdeki bahçeye adım adım ulaşın"
      />

      <View style={styles.container}>
        {STEPS.map((step, idx) => {
          const isOpen = openIdx === idx;
          return (
            <View key={step.step} style={[styles.card, { backgroundColor: colors.surface, borderColor: isOpen ? colors.primary : colors.border }]}>
              <Pressable
                onPress={() => toggle(idx)}
                style={[styles.cardHeader, Platform.OS === 'web' && ({ cursor: 'pointer' } as any)]}
              >
                <View style={[styles.stepBadge, { backgroundColor: isOpen ? colors.primary : 'rgba(153,165,55,0.12)' }]}>
                  <Text style={[styles.stepNum, { color: isOpen ? '#FFFFFF' : colors.primary }]}>{step.step}</Text>
                </View>
                <View style={styles.headerText}>
                  <View style={styles.titleRow}>
                    <MaterialCommunityIcons name={step.icon} size={20} color={isOpen ? colors.primary : colors.textSecondary} />
                    <Text style={[styles.title, { color: colors.text }]}>{step.title}</Text>
                  </View>
                  {!isOpen && (
                    <Text style={[styles.previewDesc, { color: colors.textMuted }]} numberOfLines={1}>{step.description}</Text>
                  )}
                </View>
                <View style={[styles.durationBadge, { backgroundColor: isOpen ? 'rgba(153,165,55,0.12)' : colors.surfaceAlt }]}>
                  <MaterialCommunityIcons name="clock-outline" size={13} color={colors.primary} />
                  <Text style={[styles.durationText, { color: colors.primary }]}>{step.duration}</Text>
                </View>
                <MaterialCommunityIcons name={isOpen ? 'chevron-up' : 'chevron-down'} size={22} color={colors.textMuted} />
              </Pressable>

              {isOpen && (
                <View style={[styles.cardBody, Platform.OS === 'web' && ({ animation: 'fadeIn 300ms ease' } as any)]}>
                  <Text style={[styles.desc, { color: colors.textSecondary }]}>{step.description}</Text>
                  <View style={styles.detailList}>
                    {step.details.map((d, i) => (
                      <View key={i} style={styles.detailRow}>
                        <MaterialCommunityIcons name="check-circle" size={16} color={colors.primary} />
                        <Text style={[styles.detailText, { color: colors.text }]}>{d}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </SectionWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  } as any,
  card: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1.5,
    overflow: 'hidden',
    ...Platform.select({
      web: { transitionDuration: '200ms', transitionProperty: 'border-color, box-shadow' } as any,
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  } as any,
  stepBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNum: {
    fontFamily: Fonts.headingFamily,
    fontWeight: Fonts.weights.extrabold,
    fontSize: Fonts.sizes.base,
  },
  headerText: {
    flex: 1,
    gap: 2,
  } as any,
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  } as any,
  title: {
    fontFamily: Fonts.headingFamily,
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes.base,
  },
  previewDesc: {
    fontFamily: Fonts.family,
    fontSize: Fonts.sizes.xs,
    marginTop: 2,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: BorderRadius.full,
  } as any,
  durationText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.semibold,
    fontSize: 11,
  },
  cardBody: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    paddingTop: 0,
  },
  desc: {
    fontFamily: Fonts.family,
    fontSize: Fonts.sizes.sm,
    lineHeight: 24,
    marginBottom: Spacing.md,
  },
  detailList: {
    gap: Spacing.sm,
  } as any,
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  } as any,
  detailText: {
    fontFamily: Fonts.family,
    fontSize: Fonts.sizes.sm,
    lineHeight: 22,
    flex: 1,
  },
});
