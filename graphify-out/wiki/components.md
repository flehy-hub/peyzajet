# Components (9)

Hepsi `src/components/`, barrel: `src/components/index.ts`.

| Bileşen | Dosya:satır | Not |
|---|---|---|
| Header | Header.tsx:10 | NAV_LINKS, Logo, responsive menü |
| Footer | Footer.tsx:42 | NAV_LINKS, CONTACT_INFO, bülten girişi |
| Logo | Logo.tsx:10 | Marka logosu |
| Button | Button.tsx:16 | variant: primary/secondary/outline/white; size sm/md/lg |
| SectionWrapper | SectionWrapper.tsx:14 | max-width, padding, background, anchor id |
| SectionTitle | SectionTitle.tsx:16 | overline/title/subtitle/divider |
| WhatsAppFAB | WhatsAppFAB.tsx:6 | wa.me linki (CONTACT_INFO) |
| ScrollToTopFAB | ScrollToTopFAB.tsx:6 | scroll sonrası görünür |
| StickyQuoteBar | StickyQuoteBar.tsx:7 | teklif bölümüne CTA |

Hemen hepsi [useTheme](hooks.md) kullanır; Header/Footer/SectionTitle/StickyQuoteBar ayrıca useResponsive.
