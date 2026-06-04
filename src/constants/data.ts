import type { Service, Project, BeforeAfter, Package, Testimonial, BlogPost, TeamMember } from '../types';

export const SERVICES: Service[] = [
  { id: '1', title: 'Bahçe Tasarımı', description: 'Hayalinizdeki bahçeyi profesyonel tasarım ekibimizle hayata geçiriyoruz.', icon: 'leaf', image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600', category: 'Tasarım' },
  { id: '2', title: 'Peyzaj Projelendirme', description: '3D modelleme ile projenizi tamamlanmadan önce görün.', icon: 'map', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600', category: 'Projelendirme' },
  { id: '3', title: 'Sulama Sistemleri', description: 'Akıllı ve otomatik sulama sistemleri ile tasarruf edin.', icon: 'water', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600', category: 'Sistem' },
  { id: '4', title: 'Rulo Çim Uygulaması', description: 'Anında yeşil ve bakımlı bir çim alan elde edin.', icon: 'grass', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600', category: 'Uygulama' },
  { id: '5', title: 'Bitkilendirme', description: 'İklime uygun bitki seçimi ve profesyonel dikim hizmeti.', icon: 'flower', image: 'https://images.unsplash.com/photo-1598902108854-d1446404305e?w=600', category: 'Dikim' },
  { id: '6', title: 'Bahçe Bakımı', description: 'Düzenli bakım ile bahçeniz her mevsim mükemmel kalsın.', icon: 'cut', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600', category: 'Bakım' },
  { id: '7', title: 'Aydınlatma Sistemleri', description: 'Bahçenizi gece de büyüleyici kılan aydınlatma çözümleri.', icon: 'bulb', image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600', category: 'Sistem' },
  { id: '8', title: 'Otomatik Sulama', description: 'Zamanlayıcılı sulama sistemleri ile suyunuzu verimli kullanın.', icon: 'timer', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600', category: 'Sistem' },
];

export const PROJECTS: Project[] = [
  { id: '1', title: 'Çekmeköy Villa Bahçesi', location: 'Çekmeköy, İstanbul', type: 'villa', area: 450, duration: '3 Hafta', image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800', category: 'Villa' },
  { id: '2', title: 'Bahçeşehir Site Peyzajı', location: 'Bahçeşehir, İstanbul', type: 'site', area: 2200, duration: '2 Ay', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800', category: 'Site' },
  { id: '3', title: 'Maslak Plaza Bahçesi', location: 'Maslak, İstanbul', type: 'ticari', area: 800, duration: '1 Ay', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800', category: 'Ticari' },
  { id: '4', title: 'Beykoz Teras Bahçe', location: 'Beykoz, İstanbul', type: 'villa', area: 320, duration: '2 Hafta', image: 'https://images.unsplash.com/photo-1598902108854-d1446404305e?w=800', category: 'Villa' },
  { id: '5', title: 'Pendik Hobi Bahçesi', location: 'Pendik, İstanbul', type: 'hobi', area: 150, duration: '1 Hafta', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800', category: 'Hobi Bahçesi' },
  { id: '6', title: 'Sarıyer Villa Projesi', location: 'Sarıyer, İstanbul', type: 'villa', area: 600, duration: '1 Ay', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800', category: 'Villa' },
  { id: '7', title: 'Ataşehir Rezidans Peyzajı', location: 'Ataşehir, İstanbul', type: 'site', area: 1800, duration: '6 Hafta', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800', category: 'Site' },
  { id: '8', title: 'Büyükçekmece Otel Bahçesi', location: 'Büyükçekmece, İstanbul', type: 'ticari', area: 1200, duration: '2 Ay', image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800', category: 'Ticari' },
];

export const BEFORE_AFTER: BeforeAfter[] = [
  { id: '1', title: 'Çekmeköy Villa', beforeImage: 'https://images.unsplash.com/photo-1558452919-08ae4eda4e0c?w=800', afterImage: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800' },
  { id: '2', title: 'Bahçeşehir Site', beforeImage: 'https://images.unsplash.com/photo-1501004318855-fce86ee1ade0?w=800', afterImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800' },
  { id: '3', title: 'Maslak Plaza', beforeImage: 'https://images.unsplash.com/photo-1504711434969-e33886168d3c?w=800', afterImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800' },
  { id: '4', title: 'Beykoz Teras', beforeImage: 'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?w=800', afterImage: 'https://images.unsplash.com/photo-1598902108854-d1446404305e?w=800' },
  { id: '5', title: 'Pendik Hobi Bahçesi', beforeImage: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=800', afterImage: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800' },
  { id: '6', title: 'Sarıyer Villa', beforeImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800', afterImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800' },
];

export const PACKAGES: Package[] = [
  {
    id: 'bronze',
    name: 'Bronz Paket',
    price: '2.500',
    originalPrice: '3.100',
    discount: '%20',
    commercialPrice: '3.750',
    commercialOriginalPrice: '4.700',
    period: '/ay',
    features: ['Aylık Bahçe Bakımı', 'Çim Biçme', 'Budama', 'Temizlik'],
    color: '#CD7F32',
  },
  {
    id: 'silver',
    name: 'Silver Paket',
    price: '4.500',
    originalPrice: '5.600',
    discount: '%20',
    commercialPrice: '6.750',
    commercialOriginalPrice: '8.400',
    period: '/ay',
    features: ['Bronz Paket İçeriği', 'Gübreleme', 'İlaçlama', 'Sulama Kontrolü'],
    popular: true,
    color: '#C0C0C0',
  },
  {
    id: 'gold',
    name: 'Gold Paket',
    price: '7.500',
    originalPrice: '9.400',
    discount: '%20',
    commercialPrice: '11.250',
    commercialOriginalPrice: '14.000',
    period: '/ay',
    features: ['Silver Paket İçeriği', 'Peyzaj Danışmanlığı', 'Bitki Yenileme', 'Öncelikli Destek'],
    color: '#D4B06A',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Ahmet Yılmaz', avatar: 'AY', comment: 'Bahçemiz hayal ettiğimizden bile güzel oldu. Peyzajet ekibi son derece profesyonel ve özenli çalıştı. Kesinlikle tavsiye ediyorum!', rating: 5, location: 'Çekmeköy, İstanbul' },
  { id: '2', name: 'Fatma Kaya', avatar: 'FK', comment: 'Site bahçemizin komple yenilenmesini Peyzajet ile yaptık. Sonuç muhteşem! Sakinlerimiz çok memnun.', rating: 5, location: 'Bahçeşehir, İstanbul' },
  { id: '3', name: 'Mehmet Demir', avatar: 'MD', comment: 'Otomatik sulama sistemi kurdurduk. Artık bahçemiz kendi kendine sulanıyor. Hem pratik hem ekonomik oldu.', rating: 5, location: 'Beykoz, İstanbul' },
  { id: '4', name: 'Ayşe Çelik', avatar: 'AÇ', comment: 'Villa bahçemiz için tasarımdan uygulamaya kadar her aşamada yanımızda oldular. Mükemmel iş çıkardılar.', rating: 4, location: 'Sarıyer, İstanbul' },
  { id: '5', name: 'Can Özkan', avatar: 'CÖ', comment: 'Gold paket ile aylık bakım hizmeti alıyoruz. Bahçemiz her zaman bakımlı ve güzel görünüyor.', rating: 5, location: 'Pendik, İstanbul' },
];

export const BLOG_POSTS: BlogPost[] = [
  { id: '1', title: 'Bahçe Bakımında Yapılan 10 Yaygın Hata', excerpt: 'Bahçenizin sağlıklı kalması için kaçınmanız gereken en yaygın hatalar ve doğru bakım yöntemleri hakkında bilmeniz gerekenler.', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800', date: '28 Mayıs 2026', category: 'Bahçe Bakımı' },
  { id: '2', title: 'Rulo Çim mi, Tohum mu? Hangisi Daha Avantajlı?', excerpt: 'Bahçeniz için en doğru çim seçimini yaparken dikkat etmeniz gereken faktörler ve karşılaştırmalı analiz.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800', date: '20 Mayıs 2026', category: 'Peyzaj' },
  { id: '3', title: '2026 Yılının En Trend Bahçe Tasarım Fikirleri', excerpt: 'Bu yılın öne çıkan peyzaj trendleri: sürdürülebilir bahçeler, doğal taş kullanımı ve akıllı sulama sistemleri.', image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800', date: '15 Mayıs 2026', category: 'Tasarım' },
];

export const TEAM_MEMBERS: TeamMember[] = [
  { id: '1', name: 'Mehmet Peyzajet', role: 'Kurucu & CEO', avatar: 'MP' },
  { id: '2', name: 'Ayşe Yıldız', role: 'Peyzaj Mimarı', avatar: 'AY' },
  { id: '3', name: 'Burak Kaya', role: 'Proje Müdürü', avatar: 'BK' },
  { id: '4', name: 'Zeynep Demir', role: 'Tasarım Uzmanı', avatar: 'ZD' },
];

export const STATS = [
  { value: 500, suffix: '+', label: 'Tamamlanan Proje' },
  { value: 15, suffix: '+', label: 'Yıllık Tecrübe' },
  { value: 1000, suffix: '+', label: 'Mutlu Müşteri' },
  { value: 98, suffix: '%', label: 'Memnuniyet Oranı' },
];

export const FOUNDER_QUOTE = {
  quote: 'Her bahçe bir hikaye anlatır. Biz, doğanın dilini konuşarak, hayallerinizi toprağa dönüştürüyoruz.',
  name: 'Mehmet Peyzajet',
  title: 'Kurucu & CEO',
  avatar: 'MP',
};

export const CAPABILITIES = [
  { id: '1', label: 'Villa', icon: '🏡' },
  { id: '2', label: 'Site', icon: '🏢' },
  { id: '3', label: 'Ticari', icon: '🏬' },
  { id: '4', label: 'Kamu', icon: '🏛' },
  { id: '5', label: 'Otel', icon: '🏨' },
  { id: '6', label: 'Rezidans', icon: '🏙' },
  { id: '7', label: 'Hobi Bahçesi', icon: '🌱' },
  { id: '8', label: 'Teras', icon: '🌿' },
];

export const CTA_BANNER = {
  overline: 'Ücretsiz Keşif',
  headline: 'Hayalinizdeki Bahçeye Bir Telefon Kadar Yakınsınız',
  description: 'Profesyonel ekibimiz ile ücretsiz keşif ve fiyat teklifi için hemen bizi arayın.',
};

export const PROCESS_STEPS = [
  { step: 1, title: 'Ücretsiz Keşif', description: 'Bahçenizi yerinde inceliyor, ihtiyaçlarınızı belirliyoruz.' },
  { step: 2, title: 'Tasarım & Planlama', description: '3D tasarım ile projenizi görselleştiriyoruz.' },
  { step: 3, title: 'Uygulama', description: 'Uzman ekibimizle projenizi hayata geçiriyoruz.' },
  { step: 4, title: 'Bakım & Destek', description: 'Düzenli bakım ile bahçeniz her zaman mükemmel.' },
];

export const NAV_LINKS = [
  { label: 'Ana Sayfa', href: '#hero' },
  { label: 'Hizmetler', href: '#hizmetler' },
  { label: 'Projeler', href: '#projeler' },
  { label: 'Paketler', href: '#paketler' },
  { label: 'Ekip', href: '#ekibimiz' },
  { label: 'Blog', href: '#blog' },
  { label: 'İletişim', href: '#iletisim' },
];

export const CONTACT_INFO = {
  phone: '+90 212 555 0123',
  whatsapp: '+905321234567',
  email: 'info@peyzajet.com',
  address: 'Levent, Büyükdere Cad. No:123, Beşiktaş/İstanbul',
  workingHours: 'Pazartesi - Cumartesi: 08:00 - 18:00',
};

export const PROJECT_FILTERS = ['Tümü', 'Villa', 'Site', 'Ticari', 'Hobi Bahçesi'];
