# useCostCalculator

**Dosya**: `src/hooks/useCostCalculator.ts:20`

`CostFormData` (proje tipi, alan, uygulamalar, bitki seviyesi, malzeme kalitesi, zemin) alır; [pricing](pricing.md) sabitleriyle `CostBreakdown` hesaplar (useMemo). Ek export: `formatPrice` (satır 157).

## Akış
[QuoteSection](sections.md) (form state) → useCostCalculator → CostBreakdown → ekranda min–max aralık.

Oranlar: işçilik = malzemenin %25'i, nakliye %8, makine %5; toprak hazırlığı 80–250 TL/m².

Not: `src/utils/quoteCalculator.ts` benzer ama daha basit/eski bir hesap içerir (QuoteFormData tabanlı); aktif akış bu hook.
