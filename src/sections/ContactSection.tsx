import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Platform, Pressable, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SectionWrapper } from '../components/SectionWrapper';
import { SectionTitle } from '../components/SectionTitle';
import { Button } from '../components/Button';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';
import { CONTACT_INFO } from '../constants/data';
import { Fonts, Spacing, BorderRadius } from '../theme';

const SERVICE_OPTIONS = ['Bahçe Tasarımı', 'Peyzaj Projelendirme', 'Sulama Sistemleri', 'Bahçe Bakımı', 'Komple Bahçe', 'Diğer'];

export function ContactSection() {
  const { colors } = useTheme();
  const { isMobile } = useResponsive();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: '',
    message: '',
  });

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_INFO.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'Peyzajet - Yeni İletişim Formu',
          'Ad Soyad': form.name,
          Telefon: form.phone,
          'E-posta': form.email,
          'Hizmet Türü': form.serviceType || 'Belirtilmedi',
          Mesaj: form.message,
        }),
      });
      if (!res.ok) throw new Error('send failed');
      setStatus('sent');
      setForm({ name: '', phone: '', email: '', serviceType: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <SectionWrapper id="iletisim">
      <SectionTitle
        overline="İletişim"
        title="Bizimle İletişime Geçin"
        subtitle="Ücretsiz keşif ve teklif için bize ulaşın"
      />

      <View style={[styles.wrapper, { flexDirection: isMobile ? 'column' : 'row' }]}>
        {/* Form */}
        <View style={[styles.formContainer, { backgroundColor: colors.surface }, Platform.select({
          web: { boxShadow: '0 4px 20px rgba(0,0,0,0.06)' } as any,
        })]}>
          <View style={[styles.row, { flexDirection: isMobile ? 'column' : 'row' }]}>
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>Ad Soyad</Text>
              <TextInput
                accessibilityLabel="Ad Soyad"
                value={form.name}
                onChangeText={(v) => update('name', v)}
                placeholder="Adınız Soyadınız"
                placeholderTextColor={colors.textMuted}
                style={[styles.input, { color: colors.text, backgroundColor: colors.surfaceAlt, borderColor: colors.border }]}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>Telefon</Text>
              <TextInput
                accessibilityLabel="Telefon"
                value={form.phone}
                onChangeText={(v) => update('phone', v)}
                placeholder="0 (5XX) XXX XX XX"
                placeholderTextColor={colors.textMuted}
                keyboardType="phone-pad"
                style={[styles.input, { color: colors.text, backgroundColor: colors.surfaceAlt, borderColor: colors.border }]}
              />
            </View>
          </View>

          <View style={[styles.row, { flexDirection: isMobile ? 'column' : 'row' }]}>
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>E-posta</Text>
              <TextInput
                accessibilityLabel="E-posta"
                value={form.email}
                onChangeText={(v) => update('email', v)}
                placeholder="ornek@email.com"
                placeholderTextColor={colors.textMuted}
                keyboardType="email-address"
                style={[styles.input, { color: colors.text, backgroundColor: colors.surfaceAlt, borderColor: colors.border }]}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>Hizmet Türü</Text>
              <View style={[styles.input, { backgroundColor: colors.surfaceAlt, borderColor: colors.border }]}>
                {Platform.OS === 'web' ? (
                  <select
                    value={form.serviceType}
                    onChange={(e: any) => update('serviceType', e.target.value)}
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      background: 'transparent',
                      color: form.serviceType ? colors.text : colors.textMuted,
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 14,
                      outline: 'none',
                      cursor: 'pointer',
                    } as any}
                  >
                    <option value="">Hizmet Seçiniz</option>
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <Text style={{ color: colors.textMuted }}>Hizmet Seçiniz</Text>
                )}
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.text }]}>Mesajınız</Text>
            <TextInput
              value={form.message}
              onChangeText={(v) => update('message', v)}
              placeholder="Projeniz hakkında bilgi verin..."
              placeholderTextColor={colors.textMuted}
              multiline
              numberOfLines={4}
              style={[styles.textarea, { color: colors.text, backgroundColor: colors.surfaceAlt, borderColor: colors.border }]}
            />
          </View>

          <Button
            title={status === 'sending' ? 'Gönderiliyor...' : 'Mesaj Gönder'}
            variant="primary"
            size="lg"
            onPress={status === 'sending' ? undefined : handleSubmit}
          />
          {status === 'sent' && (
            <Text style={[styles.statusText, { color: colors.primary }]}>
              Mesajınız alındı — en kısa sürede size dönüş yapacağız.
            </Text>
          )}
          {status === 'error' && (
            <Text style={[styles.statusText, { color: '#C0392B' }]}>
              Gönderilemedi. Lütfen ad ve telefon alanlarını doldurun veya WhatsApp'tan ulaşın.
            </Text>
          )}
        </View>

        {/* Info Side */}
        <View style={styles.infoSide}>
          <View style={[styles.infoCard, { backgroundColor: colors.secondary }]}>
            <Text style={styles.infoTitle}>İletişim Bilgileri</Text>

            <InfoRow icon="map-marker-outline" label="Adres" value={CONTACT_INFO.address} />
            <InfoRow icon="phone-outline" label="Telefon" value={CONTACT_INFO.phone} />
            <InfoRow icon="email-outline" label="E-posta" value={CONTACT_INFO.email} />
            <InfoRow icon="clock-outline" label="Çalışma Saatleri" value={CONTACT_INFO.workingHours} />

            <View style={styles.actionButtons}>
              <Pressable
                onPress={() => Linking.openURL(`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, '')}`)}
                style={[styles.actionBtn, { backgroundColor: '#25D366' }]}
              >
                <Text style={styles.actionBtnText}>WhatsApp ile Yaz</Text>
              </Pressable>

              <Pressable
                onPress={() => Linking.openURL(`tel:${CONTACT_INFO.phone}`)}
                style={[styles.actionBtn, { backgroundColor: '#99a537' }]}
              >
                <Text style={styles.actionBtnText}>Hemen Ara</Text>
              </Pressable>
            </View>
          </View>

          {/* Map */}
          {Platform.OS === 'web' ? (
            <View style={[styles.mapContainer, { backgroundColor: colors.surfaceAlt }]}>
              <iframe
                src="https://maps.google.com/maps?q=%C4%B0lker%20Mahallesi%2C%20Dikmen%2C%20%C3%87ankaya%2C%20Ankara&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: 16, display: 'block' } as any}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </View>
          ) : null}
        </View>
      </View>
    </SectionWrapper>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <MaterialCommunityIcons name={icon as any} size={22} color="#99a537" />
      <View style={{ flex: 1 }}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: Spacing.lg,
    alignItems: 'stretch',
  },
  formContainer: {
    flex: 1.5,
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
  },
  row: {
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  inputGroup: {
    flex: 1,
    marginBottom: Spacing.sm,
  },
  statusText: {
    fontFamily: Fonts.family,
    fontSize: Fonts.sizes.sm,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  inputLabel: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.semibold,
    fontSize: Fonts.sizes.sm,
    marginBottom: Spacing.xs,
  },
  input: {
    height: 48,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
    fontFamily: Fonts.family,
    fontSize: Fonts.sizes.sm,
    justifyContent: 'center',
    ...Platform.select({
      web: { outlineColor: '#99a537', transitionDuration: '200ms', transitionProperty: 'border-color' } as any,
    }),
  },
  textarea: {
    minHeight: 80,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontFamily: Fonts.family,
    fontSize: Fonts.sizes.sm,
    textAlignVertical: 'top',
    marginBottom: Spacing.sm,
    ...Platform.select({
      web: { outlineColor: '#99a537', resize: 'vertical' } as any,
    }),
  },
  infoSide: {
    flex: 1,
    gap: Spacing.lg,
  },
  infoCard: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
  },
  infoTitle: {
    fontFamily: Fonts.headingFamily,
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes.xl,
    color: '#FFFFFF',
    marginBottom: Spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  infoLabel: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.medium,
    fontSize: Fonts.sizes.xs,
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.regular,
    fontSize: Fonts.sizes.sm,
    color: '#FFFFFF',
    lineHeight: 22,
    marginTop: 2,
  },
  actionButtons: {
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  actionBtn: {
    paddingVertical: 14,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    ...Platform.select({ web: { cursor: 'pointer' } as any }),
  },
  actionBtnText: {
    fontFamily: Fonts.family,
    fontWeight: Fonts.weights.semibold,
    fontSize: Fonts.sizes.base,
    color: '#FFFFFF',
  },
  mapContainer: {
    height: 250,
    minHeight: 250,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    marginBottom: Spacing.md,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
