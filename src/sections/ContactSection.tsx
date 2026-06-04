import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Platform, Pressable, Linking } from 'react-native';
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

  return (
    <SectionWrapper id="iletisim">
      <SectionTitle
        title="İletişim"
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

          <Button title="Mesaj Gönder" variant="primary" size="lg" />
        </View>

        {/* Info Side */}
        <View style={styles.infoSide}>
          <View style={[styles.infoCard, { backgroundColor: colors.secondary }]}>
            <Text style={styles.infoTitle}>İletişim Bilgileri</Text>

            <InfoRow icon="📍" label="Adres" value={CONTACT_INFO.address} />
            <InfoRow icon="📞" label="Telefon" value={CONTACT_INFO.phone} />
            <InfoRow icon="✉" label="E-posta" value={CONTACT_INFO.email} />
            <InfoRow icon="⏰" label="Çalışma Saatleri" value={CONTACT_INFO.workingHours} />

            <View style={styles.actionButtons}>
              <Pressable
                onPress={() => Linking.openURL(`https://wa.me/${CONTACT_INFO.whatsapp}`)}
                style={[styles.actionBtn, { backgroundColor: '#25D366' }]}
              >
                <Text style={styles.actionBtnText}>WhatsApp ile Yaz</Text>
              </Pressable>

              <Pressable
                onPress={() => Linking.openURL(`tel:${CONTACT_INFO.phone}`)}
                style={[styles.actionBtn, { backgroundColor: '#6FA43A' }]}
              >
                <Text style={styles.actionBtnText}>Hemen Ara</Text>
              </Pressable>
            </View>
          </View>

          {/* Map placeholder */}
          <View style={[styles.mapContainer, { backgroundColor: colors.surfaceAlt }]}>
            {Platform.OS === 'web' ? (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48168.29684948!2d29.0!3d41.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAzJzAwLjAiTiAyOcKwMDAnMDAuMCJF!5e0!3m2!1str!2str!4v1600000000000!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: 16 } as any}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <View style={styles.mapPlaceholder}>
                <Text style={{ color: colors.textMuted, fontSize: 14 }}>Harita</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </SectionWrapper>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={{ fontSize: 20 }}>{icon}</Text>
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
    padding: Spacing.xl,
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
      web: { outlineColor: '#6FA43A', transitionDuration: '200ms', transitionProperty: 'border-color' } as any,
    }),
  },
  textarea: {
    minHeight: 120,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontFamily: Fonts.family,
    fontSize: Fonts.sizes.sm,
    textAlignVertical: 'top',
    marginBottom: Spacing.md,
    ...Platform.select({
      web: { outlineColor: '#6FA43A', resize: 'vertical' } as any,
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
    fontFamily: Fonts.family,
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
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
