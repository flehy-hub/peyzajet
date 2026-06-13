import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Platform, Pressable, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SectionWrapper } from '../components/SectionWrapper';
import { useResponsive } from '../hooks/useResponsive';
import { useCostCalculator, formatPrice } from '../hooks/useCostCalculator';
import { PROJECT_TYPES, APPLICATIONS, PLANT_LEVELS, MATERIAL_QUALITIES, TERRAIN_TYPES } from '../constants/pricing';
import { Fonts, Spacing, BorderRadius } from '../theme';
import type { CostFormData } from '../types';
import { CONTACT_INFO } from '../constants/data';
import { scrollToId } from '../utils/pageScroll';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

const ACCENT = '#99a537';

// Bölüm karanlık modda koyu petrol zeminli, açık modda sitenin beyaz tonlarında.
const QUOTE_PALETTES = {
  dark: {
    bg: '#223740',
    text: '#FFFFFF',
    textOnActive: '#FFFFFF',
    textDim: 'rgba(255,255,255,0.7)',
    textMuted: 'rgba(255,255,255,0.5)',
    textFaint: 'rgba(255,255,255,0.4)',
    iconFaint: 'rgba(255,255,255,0.25)',
    card: 'rgba(255,255,255,0.04)',
    cardAlt: 'rgba(255,255,255,0.06)',
    border: 'rgba(255,255,255,0.1)',
    borderLight: 'rgba(255,255,255,0.12)',
    borderStrong: 'rgba(255,255,255,0.2)',
    divider: 'rgba(255,255,255,0.08)',
    dividerThin: 'rgba(255,255,255,0.05)',
    inputBg: 'rgba(255,255,255,0.08)',
    inputBorder: 'rgba(255,255,255,0.15)',
    placeholder: 'rgba(255,255,255,0.4)',
    accentSoft: 'rgba(153,165,55,0.15)',
    accentFaint: 'rgba(153,165,55,0.08)',
  },
  light: {
    bg: '#f4f5ec',
    text: '#223740',
    textOnActive: '#FFFFFF',
    textDim: 'rgba(34,55,64,0.75)',
    textMuted: 'rgba(34,55,64,0.55)',
    textFaint: 'rgba(34,55,64,0.45)',
    iconFaint: 'rgba(34,55,64,0.3)',
    card: '#FFFFFF',
    cardAlt: '#FFFFFF',
    border: '#e4e6dc',
    borderLight: '#e4e6dc',
    borderStrong: 'rgba(34,55,64,0.3)',
    divider: 'rgba(34,55,64,0.1)',
    dividerThin: 'rgba(34,55,64,0.06)',
    inputBg: '#FFFFFF',
    inputBorder: '#e4e6dc',
    placeholder: 'rgba(34,55,64,0.35)',
    accentSoft: 'rgba(153,165,55,0.18)',
    accentFaint: 'rgba(153,165,55,0.1)',
  },
};
type QuotePalette = typeof QUOTE_PALETTES.dark;

const styleCache: Partial<Record<'light' | 'dark', ReturnType<typeof makeStyles>>> = {};
function useQuoteStyles() {
  // Bölüm her iki temada da koyu petrol zeminli kalır (tasarım kararı).
  // Açık tema varyantı istenirse QUOTE_PALETTES[mode] kullanmak yeterli.
  const mode = 'dark' as const;
  const p = QUOTE_PALETTES[mode];
  if (!styleCache[mode]) styleCache[mode] = makeStyles(p);
  return { styles: styleCache[mode]!, p };
}

const STEPS = ['Proje Türü', 'Alan', 'Tasarım', 'Uygulamalar', 'Malzeme & Arazi', 'Sonuç'];
const INITIAL_FORM: CostFormData = {
  projectType: 'Villa Bahçesi',
  area: 200,
  includeDesign: true,
  applications: ['lawn_roll', 'irrigation', 'planting'],
  plantLevel: 'Standart',
  materialQuality: 'Orta Segment',
  terrain: 'Düz Arazi',
};

export function QuoteSection() {
  const { isMobile } = useResponsive();
  const { styles, p } = useQuoteStyles();
  const [form, setForm] = useState<CostFormData>({ ...INITIAL_FORM });
  const [step, setStep] = useState(0);
  const { breakdown, meta } = useCostCalculator(form);

  const update = <K extends keyof CostFormData>(key: K, value: CostFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleApp = (key: string) => {
    setForm((prev) => {
      if (prev.applications.includes(key)) {
        return { ...prev, applications: prev.applications.filter((a) => a !== key) };
      }
      // Aynı gruptan (ör. rulo çim / tohum ekimi) yalnızca biri seçilebilir
      const group = APPLICATIONS.find((a) => a.key === key)?.exclusiveGroup;
      const rest = group
        ? prev.applications.filter((a) => APPLICATIONS.find((d) => d.key === a)?.exclusiveGroup !== group)
        : prev.applications;
      return { ...prev, applications: [...rest, key] };
    });
  };

  const canNext = step < STEPS.length - 1;
  const canPrev = step > 0;

  if (isMobile) {
    return (
      <SectionWrapper id="maliyet-hesapla" background="custom" customBg={p.bg}>
        <MobileHeader />
        <ProgressBar current={step} total={STEPS.length} />

        <View style={styles.wizardBody}>
          {step === 0 && <StepProjectType value={form.projectType} onChange={(v) => update('projectType', v)} />}
          {step === 1 && <StepArea value={form.area} onChange={(v) => update('area', v)} />}
          {step === 2 && <StepDesign value={form.includeDesign} onChange={(v) => update('includeDesign', v)} area={form.area} />}
          {step === 3 && <StepApplications selected={form.applications} onToggle={toggleApp} />}
          {step === 4 && (
            <StepMaterialTerrain
              plantLevel={form.plantLevel}
              materialQuality={form.materialQuality}
              terrain={form.terrain}
              applications={form.applications}
              onPlant={(v) => update('plantLevel', v)}
              onMaterial={(v) => update('materialQuality', v)}
              onTerrain={(v) => update('terrain', v)}
            />
          )}
          {step === 5 && <ResultCard breakdown={breakdown} meta={meta} form={form} />}
        </View>

        <View style={styles.wizardNav} {...(Platform.OS === 'web' ? { dataSet: { fabAvoid: '1' } } : {})}>
          {canPrev ? (
            <Pressable onPress={() => setStep(step - 1)} style={styles.navBtnBack}>
              <MaterialCommunityIcons name="arrow-left" size={18} color={p.text} />
              <Text style={styles.navBtnBackText}>Geri</Text>
            </Pressable>
          ) : <View />}
          {canNext ? (
            <Pressable onPress={() => setStep(step + 1)} style={styles.navBtnNext}>
              <Text style={styles.navBtnNextText}>{STEPS[step + 1]}</Text>
              <MaterialCommunityIcons name="arrow-right" size={18} color="#FFFFFF" />
            </Pressable>
          ) : null}
        </View>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="maliyet-hesapla" background="custom" customBg={p.bg}>
      <MobileHeader />
      <View style={styles.desktopLayout}>
        <View style={[styles.desktopForm, Platform.OS === 'web' && ({ boxShadow: '0 8px 32px rgba(0,0,0,0.12)' } as any)]}>
          <StepProjectType value={form.projectType} onChange={(v) => update('projectType', v)} />
          <StepArea value={form.area} onChange={(v) => update('area', v)} />
          <StepDesign value={form.includeDesign} onChange={(v) => update('includeDesign', v)} area={form.area} />
          <StepApplications selected={form.applications} onToggle={toggleApp} />
          <StepMaterialTerrain
            plantLevel={form.plantLevel}
            materialQuality={form.materialQuality}
            terrain={form.terrain}
            applications={form.applications}
            onPlant={(v) => update('plantLevel', v)}
            onMaterial={(v) => update('materialQuality', v)}
            onTerrain={(v) => update('terrain', v)}
          />
        </View>
        <View style={[styles.desktopResult, Platform.OS === 'web' && ({ position: 'sticky', top: 90 } as any)]}>
          <ResultCard breakdown={breakdown} meta={meta} form={form} />
        </View>
      </View>
    </SectionWrapper>
  );
}

/* ══════════════════════ HEADER ══════════════════════ */
function MobileHeader() {
  const { styles } = useQuoteStyles();
  return (
    <View style={styles.headerArea}>
      <Text style={styles.overline}>MALİYET HESAPLA</Text>
      <Text style={styles.heading}>Profesyonel Peyzaj{'\n'}Keşif Motoru</Text>
      <Text style={styles.subtitle}>Projenizin tahmini maliyetini anında hesaplayın</Text>
    </View>
  );
}

/* ══════════════════════ PROGRESS ══════════════════════ */
function ProgressBar({ current, total }: { current: number; total: number }) {
  const { styles } = useQuoteStyles();
  return (
    <View style={styles.progressWrap}>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${((current + 1) / total) * 100}%` as any }]} />
      </View>
      <Text style={styles.progressLabel}>{current + 1}/{total} — {STEPS[current]}</Text>
    </View>
  );
}

/* ══════════════════════ STEP 1: PROJECT TYPE ══════════════════════ */
function StepProjectType({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const { styles, p } = useQuoteStyles();
  return (
    <View>
      <SectionLabel icon="shape-outline" text="Proje Türü" />
      <View style={styles.typeGrid}>
        {PROJECT_TYPES.map((pt) => {
          const active = value === pt.label;
          return (
            <Pressable
              key={pt.label}
              onPress={() => onChange(pt.label)}
              style={[
                styles.typeCard,
                { backgroundColor: active ? ACCENT : p.cardAlt, borderColor: active ? ACCENT : p.borderLight },
                Platform.OS === 'web' && ({ cursor: 'pointer', transitionDuration: '200ms', transitionProperty: 'all' } as any),
              ]}
            >
              <MaterialCommunityIcons name={pt.icon as IconName} size={20} color={active ? p.textOnActive : p.textMuted} />
              <Text style={[styles.typeLabel, { color: active ? p.textOnActive : p.textDim }]} numberOfLines={1}>{pt.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

/* ══════════════════════ STEP 2: AREA ══════════════════════ */
function StepArea({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const { styles } = useQuoteStyles();
  const [inputText, setInputText] = useState(String(value));
  const inputRef = useRef<TextInput>(null);

  const handleInputBlur = () => {
    let num = parseInt(inputText, 10);
    if (isNaN(num) || num < 50) num = 50;
    if (num > 2000) num = 2000;
    onChange(num);
    setInputText(String(num));
  };

  const handleSliderChange = (v: number) => {
    onChange(v);
    setInputText(String(v));
  };

  const pct = ((value - 50) / 1950) * 100;

  return (
    <View>
      <SectionLabel icon="ruler-square" text="Alan Büyüklüğü" />

      {/* Manual input */}
      <View style={styles.areaInputRow}>
        <View style={styles.areaInputWrap}>
          {Platform.OS === 'web' ? (
            <input
              type="number"
              min="50"
              max="2000"
              value={inputText}
              onChange={(e: any) => setInputText(e.target.value)}
              onBlur={handleInputBlur}
              onKeyDown={(e: any) => { if (e.key === 'Enter') handleInputBlur(); }}
              onTouchStart={(e: any) => e.stopPropagation()}
              onTouchEnd={(e: any) => e.stopPropagation()}
              style={{
                width: '100%', height: '100%', border: 'none', backgroundColor: 'transparent',
                color: '#99a537', fontFamily: '"Inter Tight", sans-serif', fontWeight: 800,
                fontSize: 36, textAlign: 'center', outline: 'none',
                MozAppearance: 'textfield',
              } as any}
            />
          ) : (
            <TextInput
              ref={inputRef}
              value={inputText}
              onChangeText={setInputText}
              onBlur={handleInputBlur}
              keyboardType="number-pad"
              style={styles.areaInputNative}
            />
          )}
        </View>
        <Text style={styles.areaSuffix}>m²</Text>
      </View>

      {/* Slider */}
      <View style={styles.sliderWrap}>
        <View style={styles.sliderTrack}>
          <View style={[styles.sliderFill, { width: `${pct}%` as any }]} />
          {/* Thumb */}
          <View style={[styles.sliderThumb, { left: `${pct}%` as any }]} />
          {Platform.OS === 'web' && (
            <input
              type="range" min="50" max="2000" step="10" value={value}
              onChange={(e: any) => handleSliderChange(Number(e.target.value))}
              onTouchStart={(e: any) => e.stopPropagation()}
              onTouchEnd={(e: any) => e.stopPropagation()}
              style={{ position: 'absolute', top: -8, left: 0, width: '100%', height: 24, opacity: 0, cursor: 'pointer', margin: 0 } as any}
            />
          )}
        </View>
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabel}>50 m²</Text>
          <Text style={styles.sliderLabel}>2.000 m²</Text>
        </View>
      </View>
    </View>
  );
}

/* ══════════════════════ STEP 3: DESIGN ══════════════════════ */
function StepDesign({ value, onChange, area }: { value: boolean; onChange: (v: boolean) => void; area: number }) {
  const { styles, p } = useQuoteStyles();
  return (
    <View>
      <SectionLabel icon="pencil-ruler" text="Peyzaj Tasarım Hizmeti" />
      <Pressable
        onPress={() => onChange(!value)}
        style={[
          styles.toggleCard,
          { backgroundColor: value ? p.accentSoft : p.card, borderColor: value ? ACCENT : p.border },
          Platform.OS === 'web' && ({ cursor: 'pointer' } as any),
        ]}
      >
        <MaterialCommunityIcons name={value ? 'check-circle' : 'circle-outline'} size={22} color={value ? ACCENT : p.textFaint} />
        <View style={{ flex: 1 }}>
          <Text style={styles.toggleTitle}>Peyzaj Mimarı Projesi</Text>
          <Text style={styles.toggleDesc}>Profesyonel peyzaj mimarı tarafından hazırlanan detaylı proje</Text>
        </View>
      </Pressable>
    </View>
  );
}

/* ══════════════════════ STEP 4: APPLICATIONS ══════════════════════ */
function StepApplications({ selected, onToggle }: { selected: string[]; onToggle: (key: string) => void }) {
  const { styles, p } = useQuoteStyles();
  return (
    <View>
      <SectionLabel icon="hammer-wrench" text="Uygulama Kapsamı" />
      <View style={styles.appGrid}>
        {APPLICATIONS.map((app) => {
          const active = selected.includes(app.key);
          return (
            <Pressable
              key={app.key}
              onPress={() => onToggle(app.key)}
              style={[
                styles.appCard,
                { backgroundColor: active ? p.accentSoft : p.card, borderColor: active ? ACCENT : p.border },
                Platform.OS === 'web' && ({ cursor: 'pointer', transitionDuration: '200ms', transitionProperty: 'all' } as any),
              ]}
            >
              <MaterialCommunityIcons name={app.icon as IconName} size={18} color={active ? ACCENT : p.textMuted} />
              <Text style={[styles.appLabel, { color: active ? p.text : p.textDim }]} numberOfLines={1}>{app.label}</Text>
              <MaterialCommunityIcons name={active ? 'check-circle' : 'plus-circle-outline'} size={14} color={active ? ACCENT : p.iconFaint} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

/* ══════════════════════ STEP 5: MATERIAL & TERRAIN ══════════════════════ */
function StepMaterialTerrain({
  plantLevel, materialQuality, terrain, applications,
  onPlant, onMaterial, onTerrain,
}: {
  plantLevel: string; materialQuality: string; terrain: string; applications: string[];
  onPlant: (v: string) => void; onMaterial: (v: string) => void; onTerrain: (v: string) => void;
}) {
  const { styles } = useQuoteStyles();
  const hasPlanting = applications.includes('planting');
  const hasHardscape = applications.some(
    (key) => APPLICATIONS.find((a) => a.key === key)?.affectedByMaterial
  );
  return (
    <View>
      {hasPlanting ? (
        <>
          <SectionLabel icon="tree-outline" text="Bitkilendirme Seviyesi" />
          <OptionGrid
            options={PLANT_LEVELS.map((p) => ({ label: p.label, icon: p.icon }))}
            selected={plantLevel}
            onSelect={onPlant}
          />
        </>
      ) : (
        <>
          <SectionLabel icon="tree-outline" text="Bitkilendirme Seviyesi" />
          <Text style={styles.optionHint}>Uygulama kapsamına "Bitkilendirme" eklerseniz seviye seçebilirsiniz.</Text>
        </>
      )}

      <View style={{ height: Spacing.lg }} />
      {hasHardscape ? (
        <>
          <SectionLabel icon="diamond-stone" text="Malzeme Kalitesi (sert zemin & yapılar)" />
          <OptionGrid
            options={MATERIAL_QUALITIES.map((m) => ({ label: m.label, icon: m.icon }))}
            selected={materialQuality}
            onSelect={onMaterial}
          />
        </>
      ) : (
        <>
          <SectionLabel icon="diamond-stone" text="Malzeme Kalitesi" />
          <Text style={styles.optionHint}>Taş, deck, pergola gibi yapısal bir kalem seçtiğinizde malzeme kalitesi devreye girer.</Text>
        </>
      )}

      <View style={{ height: Spacing.lg }} />
      <SectionLabel icon="terrain" text="Arazi Durumu" />
      <OptionGrid
        options={TERRAIN_TYPES.map((t) => ({ label: t.label, icon: t.icon }))}
        selected={terrain}
        onSelect={onTerrain}
      />
    </View>
  );
}

/* ══════════════════════ RESULT CARD ══════════════════════ */
function ResultCard({ breakdown, meta, form }: { breakdown: any; meta: any; form: CostFormData }) {
  const { styles, p } = useQuoteStyles();
  const b = breakdown;
  const [leadEmail, setLeadEmail] = useState('');
  const [leadStatus, setLeadStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const sendQuoteByEmail = async () => {
    if (!/^\S+@\S+\.\S+$/.test(leadEmail)) {
      setLeadStatus('error');
      return;
    }
    setLeadStatus('sending');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_INFO.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'Peyzajet - Hesaplayıcıdan Teklif Talebi',
          'Müşteri E-posta': leadEmail,
          'Proje Türü': form.projectType,
          'Alan (m²)': String(form.area),
          'Tasarım Dahil': form.includeDesign ? 'Evet' : 'Hayır',
          Uygulamalar: form.applications.join(', '),
          'Bitki Seviyesi': form.plantLevel,
          'Malzeme Kalitesi': form.materialQuality,
          Arazi: form.terrain,
          'Tahmini Maliyet (KDV dahil)': `₺${formatPrice(b.grandTotal.min)} – ₺${formatPrice(b.grandTotal.max)}`,
        }),
      });
      if (!res.ok) throw new Error('send failed');
      setLeadStatus('sent');
    } catch {
      setLeadStatus('error');
    }
  };
  return (
    <View style={styles.resultCard}>
      <View style={styles.resultHeader}>
        <MaterialCommunityIcons name="calculator-variant-outline" size={24} color="#99a537" />
        <Text style={styles.resultTitle}>Tahmini Maliyet (KDV Dahil)</Text>
      </View>

      <View style={styles.grandRow}>
        <View>
          <Text style={styles.grandLabel}>Minimum</Text>
          <Text style={styles.grandMin}>₺{formatPrice(b.grandTotal.min)}</Text>
        </View>
        <Text style={styles.grandDash}>—</Text>
        <View>
          <Text style={styles.grandLabel}>Maksimum</Text>
          <Text style={styles.grandMax}>₺{formatPrice(b.grandTotal.max)}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.breakdownTitle}>Maliyet Dağılımı</Text>

      {form.includeDesign && b.designFee.max > 0 && (
        <BreakdownRow icon="pencil-ruler" label="Tasarım Ücreti" min={b.designFee.min} max={b.designFee.max} />
      )}
      {b.soilPrep.max > 0 && (
        <BreakdownRow icon="shovel" label="Toprak Hazırlığı" min={b.soilPrep.min} max={b.soilPrep.max} />
      )}

      {form.applications.map((appKey: string) => {
        const cost = b.applicationCosts[appKey];
        const appDef = APPLICATIONS.find((a) => a.key === appKey);
        if (!cost || !appDef) return null;
        return <BreakdownRow key={appKey} icon={appDef.icon as IconName} label={appDef.label} min={cost.min} max={cost.max} />;
      })}

      <View style={styles.dividerThin} />
      <BreakdownRow icon="truck-outline" label="Genel Giderler & Lojistik" min={b.overhead.min} max={b.overhead.max} />
      <BreakdownRow icon="calculator" label="Ara Toplam" min={b.subtotal.min} max={b.subtotal.max} />
      <BreakdownRow icon="receipt" label="KDV (%20)" min={b.vat.min} max={b.vat.max} />

      <View style={styles.divider} />

      <Text style={styles.breakdownTitle}>Proje Detayları</Text>
      <View style={styles.metaGrid}>
        <MetaItem icon="clock-outline" label="Tahmini Süre" value={meta.estimatedDuration} />
        <MetaItem icon="account-group" label="Ekip Sayısı" value={meta.teamSize} />
        <MetaItem icon="water-outline" label="Sulama Bölgesi" value={meta.irrigationZones} />
        <MetaItem icon="calendar-check" label="Yıllık Bakım" value={meta.yearlyMaintenance} />
        <MetaItem icon="speedometer" label="Zorluk" value={meta.difficulty} />
      </View>

      <View style={styles.divider} />

      <Text style={styles.disclaimer}>Bu teklif ön keşif verilerine göre oluşturulmuştur. Kesin fiyat için ücretsiz keşif talep edin.</Text>

      {/* E-posta ile teklif gönderimi (lead capture) */}
      <View style={styles.leadBox}>
        <Text style={styles.leadTitle}>Bu teklifi e-postanıza gönderelim</Text>
        {leadStatus === 'sent' ? (
          <Text style={styles.leadSuccess}>Talebiniz alındı — teklifiniz en kısa sürede e-postanıza iletilecek.</Text>
        ) : (
          <>
            <View style={styles.leadRow}>
              <TextInput
                accessibilityLabel="E-posta adresiniz"
                value={leadEmail}
                onChangeText={(v) => { setLeadEmail(v); if (leadStatus === 'error') setLeadStatus('idle'); }}
                placeholder="ornek@email.com"
                placeholderTextColor={p.placeholder}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.leadInput}
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Teklifi e-postama gönder"
                onPress={leadStatus === 'sending' ? undefined : sendQuoteByEmail}
                style={styles.leadBtn}
              >
                <MaterialCommunityIcons name={leadStatus === 'sending' ? 'timer-sand' : 'send'} size={18} color="#FFFFFF" />
              </Pressable>
            </View>
            {leadStatus === 'error' && (
              <Text style={styles.leadError}>Geçerli bir e-posta adresi girin.</Text>
            )}
          </>
        )}
      </View>

      <View style={{ gap: Spacing.sm, marginTop: Spacing.md }} {...(Platform.OS === 'web' ? { dataSet: { fabAvoid: '1' } } : {})}>
        <Pressable
          onPress={() => {
            if (Platform.OS === 'web') {
              scrollToId('iletisim');
            }
          }}
          style={styles.kesifBtn}
        >
          <MaterialCommunityIcons name="clipboard-text-outline" size={20} color="#FFFFFF" />
          <Text style={styles.btnText}>Ücretsiz Keşif Talep Et</Text>
          <MaterialCommunityIcons name="arrow-right" size={18} color="#FFFFFF" />
        </Pressable>
        <Pressable
          onPress={() => {
            const msg =
              `Merhaba, web sitenizdeki maliyet hesaplayıcıyı kullandım.\n\n` +
              `• Proje: ${form.projectType}\n` +
              `• Alan: ${form.area} m²\n` +
              (form.includeDesign ? `• Peyzaj mimarı tasarımı dahil\n` : '') +
              `• Tahmini maliyet (KDV dahil): ₺${formatPrice(b.grandTotal.min)} – ₺${formatPrice(b.grandTotal.max)}\n\n` +
              `Detaylı bilgi ve ücretsiz keşif için görüşmek istiyorum.`;
            Linking.openURL(
              `https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`
            );
          }}
          style={styles.whatsappBtn}
        >
          <MaterialCommunityIcons name="whatsapp" size={20} color="#FFFFFF" />
          <Text style={styles.btnText}>WhatsApp'tan Uzmanımıza Danışın</Text>
        </Pressable>
      </View>
    </View>
  );
}

/* ══════════════════════ SMALL COMPONENTS ══════════════════════ */
function SectionLabel({ icon, text }: { icon: IconName; text: string }) {
  const { styles } = useQuoteStyles();
  return (
    <View style={styles.sectionLabelRow}>
      <MaterialCommunityIcons name={icon} size={18} color="#99a537" />
      <Text style={styles.sectionLabelText}>{text}</Text>
    </View>
  );
}

function OptionGrid({ options, selected, onSelect }: { options: { label: string; icon: string }[]; selected: string; onSelect: (v: string) => void }) {
  const { styles, p } = useQuoteStyles();
  return (
    <View style={styles.terrainGrid}>
      {options.map((opt) => {
        const active = selected === opt.label;
        return (
          <Pressable
            key={opt.label}
            onPress={() => onSelect(opt.label)}
            style={[
              styles.terrainCard,
              { backgroundColor: active ? p.accentSoft : p.card, borderColor: active ? ACCENT : p.border },
              Platform.OS === 'web' && ({ cursor: 'pointer', transitionDuration: '200ms' } as any),
            ]}
          >
            <MaterialCommunityIcons name={opt.icon as IconName} size={16} color={active ? ACCENT : p.textMuted} />
            <Text style={[styles.terrainLabel, { color: active ? p.text : p.textDim }]}>{opt.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function BreakdownRow({ icon, label, min, max }: { icon: IconName; label: string; min: number; max: number }) {
  const { styles, p } = useQuoteStyles();
  return (
    <View style={styles.bdRow}>
      <View style={styles.bdLeft}>
        <MaterialCommunityIcons name={icon} size={15} color={p.textFaint} />
        <Text style={styles.bdLabel}>{label}</Text>
      </View>
      <Text style={styles.bdValue}>₺{formatPrice(min)} – ₺{formatPrice(max)}</Text>
    </View>
  );
}

function MetaItem({ icon, label, value }: { icon: IconName; label: string; value: string }) {
  const { styles } = useQuoteStyles();
  return (
    <View style={styles.metaItem}>
      <MaterialCommunityIcons name={icon} size={18} color="#99a537" />
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  );
}

/* ══════════════════════ STYLES ══════════════════════ */
const makeStyles = (p: QuotePalette) => StyleSheet.create({
  /* Header */
  headerArea: { marginBottom: Spacing.xl },
  overline: { fontFamily: Fonts.family, fontWeight: Fonts.weights.semibold, fontSize: 12, color: ACCENT, letterSpacing: 2, marginBottom: Spacing.sm },
  heading: { fontFamily: Fonts.headingFamily, fontWeight: Fonts.weights.bold, fontSize: 34, color: p.text, lineHeight: 42, marginBottom: Spacing.sm },
  subtitle: { fontFamily: Fonts.family, fontSize: Fonts.sizes.base, color: p.textMuted, lineHeight: 24 },

  /* Progress */
  progressWrap: { marginBottom: Spacing.lg },
  progressTrack: { height: 4, backgroundColor: p.divider, borderRadius: 2, overflow: 'hidden', marginBottom: 6 },
  progressFill: { height: '100%', backgroundColor: ACCENT, borderRadius: 2, ...Platform.select({ web: { transitionDuration: '300ms', transitionProperty: 'width' } as any }) },
  progressLabel: { fontFamily: Fonts.family, fontSize: 12, color: p.textMuted },

  /* Wizard */
  wizardBody: { minHeight: 300 },
  wizardNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Spacing.xl, paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: p.divider } as any,
  navBtnBack: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 12, paddingHorizontal: 16, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: p.borderStrong, ...Platform.select({ web: { cursor: 'pointer' } as any }) } as any,
  navBtnBackText: { fontFamily: Fonts.family, fontWeight: Fonts.weights.medium, fontSize: 14, color: p.text },
  navBtnNext: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 12, paddingHorizontal: 20, borderRadius: BorderRadius.md, backgroundColor: ACCENT, ...Platform.select({ web: { cursor: 'pointer' } as any }) } as any,
  navBtnNextText: { fontFamily: Fonts.family, fontWeight: Fonts.weights.semibold, fontSize: 14, color: '#FFFFFF' },

  /* Desktop */
  desktopLayout: { flexDirection: 'row', gap: Spacing.xl, alignItems: 'flex-start' } as any,
  desktopForm: { flex: 1.3, backgroundColor: p.card, borderRadius: BorderRadius.xl, borderWidth: 1, borderColor: p.border, padding: Spacing.xl, gap: Spacing.xl } as any,
  desktopResult: { flex: 1 },

  /* Section label */
  sectionLabelRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.md } as any,
  sectionLabelText: { fontFamily: Fonts.headingFamily, fontWeight: Fonts.weights.bold, fontSize: Fonts.sizes.base, color: p.text },

  /* Type cards — 2-column grid */
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 } as any,
  typeCard: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingVertical: 12, paddingHorizontal: 14,
    borderRadius: BorderRadius.md, borderWidth: 1,
    width: 'calc(50% - 4px)' as any,
  } as any,
  typeLabel: { fontFamily: Fonts.family, fontWeight: Fonts.weights.medium, fontSize: 13, flex: 1 },

  /* Area */
  areaInputRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', gap: 6, marginBottom: Spacing.lg } as any,
  areaInputWrap: {
    width: 130, height: 52,
    backgroundColor: p.cardAlt,
    borderRadius: BorderRadius.md,
    borderWidth: 1, borderColor: p.borderLight,
    justifyContent: 'center', alignItems: 'center',
    overflow: 'hidden',
  },
  areaInputNative: {
    fontFamily: Fonts.headingFamily, fontWeight: Fonts.weights.extrabold,
    fontSize: 36, color: '#99a537', textAlign: 'center',
    width: '100%' as any, height: '100%' as any,
  },
  areaSuffix: { fontFamily: Fonts.family, fontWeight: Fonts.weights.medium, fontSize: 18, color: p.textMuted },
  sliderWrap: { marginTop: 0 },
  sliderTrack: { height: 8, backgroundColor: p.divider, borderRadius: 4, overflow: 'visible', position: 'relative' } as any,
  sliderFill: { height: '100%', borderRadius: 4, backgroundColor: ACCENT, ...Platform.select({ web: { transitionDuration: '100ms' } as any }) },
  sliderThumb: {
    position: 'absolute', top: -6, width: 20, height: 20,
    borderRadius: 10, backgroundColor: '#FFFFFF',
    marginLeft: -10,
    ...Platform.select({ web: { boxShadow: '0 2px 8px rgba(0,0,0,0.3)', transitionDuration: '100ms' } as any }),
  } as any,
  sliderLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 } as any,
  sliderLabel: { fontFamily: Fonts.family, fontSize: 11, color: p.textFaint },

  /* Design toggle */
  toggleCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, borderRadius: BorderRadius.lg, borderWidth: 1 } as any,
  toggleTitle: { fontFamily: Fonts.headingFamily, fontWeight: Fonts.weights.bold, fontSize: 14, color: p.text },
  optionHint: { fontFamily: Fonts.family, fontSize: 12, color: p.textFaint, lineHeight: 18 },
  toggleDesc: { fontFamily: Fonts.family, fontSize: 12, color: p.textMuted, marginTop: 2 },

  /* Applications — 2-column */
  appGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 } as any,
  appCard: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: 10, paddingHorizontal: 10,
    borderRadius: BorderRadius.md, borderWidth: 1,
    width: 'calc(50% - 4px)' as any,
  } as any,
  appLabel: { fontFamily: Fonts.family, fontWeight: Fonts.weights.medium, fontSize: 11, flex: 1 },

  /* Option cards — 2-column (bitki seviyesi, malzeme, arazi) */
  terrainGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 } as any,
  terrainCard: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: 10, paddingHorizontal: 12,
    borderRadius: BorderRadius.md, borderWidth: 1,
    width: 'calc(50% - 4px)' as any,
  } as any,
  terrainLabel: { fontFamily: Fonts.family, fontWeight: Fonts.weights.medium, fontSize: 13 },

  /* Result card */
  resultCard: { backgroundColor: p.card, borderRadius: BorderRadius.xl, borderWidth: 1, borderColor: p.border, padding: Spacing.lg } as any,
  resultHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.md } as any,
  resultTitle: { fontFamily: Fonts.headingFamily, fontWeight: Fonts.weights.bold, fontSize: Fonts.sizes.lg, color: p.text },
  grandRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: Spacing.md, paddingHorizontal: Spacing.sm, backgroundColor: p.accentFaint, borderRadius: BorderRadius.lg } as any,
  grandLabel: { fontFamily: Fonts.family, fontSize: 11, color: p.textMuted, marginBottom: 2 },
  grandMin: { fontFamily: Fonts.headingFamily, fontWeight: Fonts.weights.bold, fontSize: 20, color: p.text },
  grandMax: { fontFamily: Fonts.headingFamily, fontWeight: Fonts.weights.extrabold, fontSize: 20, color: ACCENT },
  grandDash: { fontFamily: Fonts.family, fontSize: 18, color: p.textFaint },

  divider: { height: 1, backgroundColor: p.divider, marginVertical: Spacing.md },
  dividerThin: { height: 1, backgroundColor: p.dividerThin, marginVertical: Spacing.sm },

  /* Breakdown */
  breakdownTitle: { fontFamily: Fonts.headingFamily, fontWeight: Fonts.weights.semibold, fontSize: 13, color: p.textMuted, letterSpacing: 1, marginBottom: Spacing.sm, textTransform: 'uppercase' },
  bdRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 } as any,
  bdLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 } as any,
  bdLabel: { fontFamily: Fonts.family, fontSize: 13, color: p.textDim },
  bdValue: { fontFamily: Fonts.family, fontWeight: Fonts.weights.medium, fontSize: 12, color: p.text },

  /* Meta */
  metaGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 } as any,
  metaItem: { width: 'calc(50% - 5px)' as any, backgroundColor: p.cardAlt, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: p.dividerThin, padding: 12, gap: 4 } as any,
  metaLabel: { fontFamily: Fonts.family, fontSize: 11, color: p.textFaint },
  metaValue: { fontFamily: Fonts.headingFamily, fontWeight: Fonts.weights.bold, fontSize: 14, color: p.text },

  /* CTA */
  disclaimer: { fontFamily: Fonts.family, fontSize: 11, color: p.textFaint, textAlign: 'center', lineHeight: 16 },
  leadBox: { marginTop: Spacing.md, padding: Spacing.md, borderRadius: BorderRadius.lg, backgroundColor: p.accentFaint, borderWidth: 1, borderColor: 'rgba(153,165,55,0.25)' } as any,
  leadTitle: { fontFamily: Fonts.family, fontWeight: Fonts.weights.semibold, fontSize: 13, color: p.text, marginBottom: Spacing.sm },
  leadRow: { flexDirection: 'row', gap: Spacing.sm, alignItems: 'center' } as any,
  leadInput: { flex: 1, paddingVertical: 10, paddingHorizontal: 12, borderRadius: BorderRadius.md, backgroundColor: p.inputBg, borderWidth: 1, borderColor: p.inputBorder, color: p.text, fontFamily: Fonts.family, fontSize: 13 } as any,
  leadBtn: { width: 42, height: 42, borderRadius: BorderRadius.md, backgroundColor: ACCENT, justifyContent: 'center', alignItems: 'center', ...Platform.select({ web: { cursor: 'pointer' } as any }) } as any,
  leadSuccess: { fontFamily: Fonts.family, fontSize: 12, color: ACCENT, lineHeight: 18 },
  leadError: { fontFamily: Fonts.family, fontSize: 11, color: '#E57373', marginTop: 6 },
  kesifBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: BorderRadius.md, backgroundColor: ACCENT, ...Platform.select({ web: { cursor: 'pointer' } as any }) } as any,
  whatsappBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: BorderRadius.md, backgroundColor: '#25D366', ...Platform.select({ web: { cursor: 'pointer' } as any }) } as any,
  btnText: { fontFamily: Fonts.family, fontWeight: Fonts.weights.semibold, fontSize: 14, color: '#FFFFFF' },
});
