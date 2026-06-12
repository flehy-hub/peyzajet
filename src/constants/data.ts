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
  { id: '1', title: 'İncek Villa Bahçesi', location: 'İncek, Ankara', type: 'villa', area: 450, duration: '3 Hafta', image: require('../../assets/images/projects/villa-incek.jpg'), category: 'Villa' },
  { id: '2', title: 'Yaşamkent Site Peyzajı', location: 'Yaşamkent, Ankara', type: 'site', area: 2200, duration: '2 Ay', image: require('../../assets/images/projects/site-yasamkent.jpg'), category: 'Site' },
  { id: '3', title: 'Söğütözü Plaza Bahçesi', location: 'Söğütözü, Ankara', type: 'ticari', area: 800, duration: '1 Ay', image: require('../../assets/images/projects/plaza-sogutozu.jpg'), category: 'Ticari' },
  { id: '4', title: 'Dikmen Teras Bahçe', location: 'Dikmen, Ankara', type: 'villa', area: 320, duration: '2 Hafta', image: require('../../assets/images/projects/teras-dikmen.jpg'), category: 'Villa' },
  { id: '5', title: 'Gölbaşı Hobi Bahçesi', location: 'Gölbaşı, Ankara', type: 'hobi', area: 150, duration: '1 Hafta', image: require('../../assets/images/projects/hobi-golbasi.jpg'), category: 'Hobi Bahçesi' },
  { id: '6', title: 'Beysukent Villa Projesi', location: 'Beysukent, Ankara', type: 'villa', area: 600, duration: '1 Ay', image: require('../../assets/images/projects/villa-beysukent.jpg'), category: 'Villa' },
  { id: '7', title: 'Oran Rezidans Peyzajı', location: 'Oran, Ankara', type: 'site', area: 1800, duration: '6 Hafta', image: require('../../assets/images/projects/rezidans-oran.jpg'), category: 'Site' },
  { id: '8', title: 'Kızılcahamam Otel Bahçesi', location: 'Kızılcahamam, Ankara', type: 'ticari', area: 1200, duration: '2 Ay', image: require('../../assets/images/projects/otel-kizilcahamam.jpg'), category: 'Ticari' },
];

export const BEFORE_AFTER: BeforeAfter[] = [
  { id: '1', title: 'Modern Villa Bahçesi', category: 'Bahçe Düzenleme', area: '1.200 m²', location: 'İncek, Ankara', beforeImage: require('../../assets/images/before-after/villa-once.jpg'), afterImage: require('../../assets/images/before-after/villa-sonra.jpg') },
  { id: '2', title: 'Boş Araziden Yeşil Villaya', category: 'Villa Peyzajı', area: '2.500 m²', location: 'Yaşamkent, Ankara', beforeImage: require('../../assets/images/before-after/luks-once.jpg'), afterImage: require('../../assets/images/before-after/luks-sonra.jpg') },
  { id: '3', title: 'Plaza Çevre Düzenlemesi', category: 'Sert Zemin', area: '800 m²', location: 'Söğütözü, Ankara', beforeImage: require('../../assets/images/before-after/plaza-once.jpg'), afterImage: require('../../assets/images/before-after/plaza-sonra.jpg') },
  { id: '4', title: 'Çiçek Bahçesi Dönüşümü', category: 'Bitkilendirme', area: '350 m²', location: 'Çayyolu, Ankara', beforeImage: require('../../assets/images/before-after/cicek-once.jpg'), afterImage: require('../../assets/images/before-after/cicek-sonra.jpg') },
  { id: '5', title: 'Sebze Bahçesi Kurulumu', category: 'Hobi Bahçesi', area: '200 m²', location: 'Gölbaşı, Ankara', beforeImage: require('../../assets/images/before-after/sebze-once.jpg'), afterImage: require('../../assets/images/before-after/sebze-sonra.jpg') },
];

export const PACKAGES: Package[] = [
  {
    id: 'bronze',
    name: 'Temel Bakım',
    priceMin: '3.500',
    priceMax: '8.000',
    area: '100 – 300 m²',
    frequency: 'Tek Seferlik',
    features: [
      'Çim biçme ve kenar düzeltme',
      'Yabani ot temizliği ve çapalama',
      'Temel çalı budama',
      'Yaprak ve çöp toplama',
      'Genel sulama kontrolü',
      'Basit gübreleme (NPK)',
    ],
    color: '#CD7F32',
  },
  {
    id: 'silver',
    name: 'Kapsamlı Bakım',
    priceMin: '8.000',
    priceMax: '18.000',
    area: '300 – 600 m²',
    frequency: 'Tek Seferlik',
    features: [
      'Çim biçme, havalandırma ve tohumlama',
      'Detaylı gübreleme (NPK + organik)',
      'Zirai ilaçlama ve bordo bulamacı',
      'Ağaç ve çalı form budaması',
      'Mevsimlik çiçek dikimi',
      'Sulama sistemi bakım ve ayarı',
      'Yabani ot temizliği ve çapalama',
      'Bahçe genel düzenleme',
    ],
    popular: true,
    color: '#C0C0C0',
  },
  {
    id: 'gold',
    name: 'Premium Bakım',
    priceMin: '18.000',
    priceMax: '45.000',
    area: '600 – 1.500 m²',
    frequency: 'Tek Seferlik',
    features: [
      'Komple çim bakımı (biçme, havalandırma, ekim)',
      'Profesyonel gübreleme programı',
      'Zararlı mücadele ve ilaçlama',
      'Ağaç budama ve aşılama',
      'Çalı form kesimi ve gençleştirme',
      'Mevsimlik çiçek ve yer örtücü dikimi',
      'Sulama sistemi komple bakım ve onarım',
      'Çim rulo yenileme (yıpranmış alanlar)',
      'Toprak analizi ve iyileştirme',
      'Bahçe temizliği ve moloz kaldırma',
    ],
    color: '#D4B06A',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Ahmet Yılmaz', avatar: 'AY', comment: 'Bahçemiz hayal ettiğimizden bile güzel oldu. Peyzajet ekibi son derece profesyonel ve özenli çalıştı. Kesinlikle tavsiye ediyorum!', rating: 5, location: 'İncek, Ankara' },
  { id: '2', name: 'Fatma Kaya', avatar: 'FK', comment: 'Site bahçemizin komple yenilenmesini Peyzajet ile yaptık. Sonuç muhteşem! Sakinlerimiz çok memnun.', rating: 5, location: 'Yaşamkent, Ankara' },
  { id: '3', name: 'Mehmet Demir', avatar: 'MD', comment: 'Otomatik sulama sistemi kurdurduk. Artık bahçemiz kendi kendine sulanıyor. Hem pratik hem ekonomik oldu.', rating: 5, location: 'Dikmen, Ankara' },
  { id: '4', name: 'Ayşe Çelik', avatar: 'AÇ', comment: 'Villa bahçemiz için tasarımdan uygulamaya kadar her aşamada yanımızda oldular. Mükemmel iş çıkardılar.', rating: 4, location: 'Beysukent, Ankara' },
  { id: '5', name: 'Can Özkan', avatar: 'CÖ', comment: 'Gold paket ile aylık bakım hizmeti alıyoruz. Bahçemiz her zaman bakımlı ve güzel görünüyor.', rating: 5, location: 'Gölbaşı, Ankara' },
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
  { value: 29, suffix: '+', label: 'Yıllık Deneyim' },
  { value: 2, suffix: 'k', label: 'Tamamlanan Proje' },
  { value: 10, suffix: '', label: 'Uzman Kadro' },
  { value: 98, suffix: '%', label: 'Müşteri Memnuniyeti' },
  { value: 47, suffix: '', label: 'Aktif Proje' },
];

export const FOUNDER_QUOTE = {
  quote: 'Her bahçe bir hikaye anlatır. Biz, doğanın dilini konuşarak, hayallerinizi toprağa dönüştürüyoruz.',
  name: 'Mehmet Peyzajet',
  title: 'Kurucu & CEO',
  avatar: 'MP',
};

export const CAPABILITIES = [
  { id: '1', label: 'Villa', icon: 'home-roof' },
  { id: '2', label: 'Site', icon: 'office-building' },
  { id: '3', label: 'Ticari', icon: 'store' },
  { id: '4', label: 'Kamu', icon: 'bank' },
  { id: '5', label: 'Otel', icon: 'bed-outline' },
  { id: '6', label: 'Rezidans', icon: 'city-variant-outline' },
  { id: '7', label: 'Hobi Bahçesi', icon: 'sprout' },
  { id: '8', label: 'Teras', icon: 'flower-outline' },
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
  { label: 'Blog', href: '#blog' },
  { label: 'İletişim', href: '#iletisim' },
];

export const CONTACT_INFO = {
  phone: '+90 532 642 43 73',
  whatsapp: '+905326424373',
  email: 'peyzajet@gmail.com',
  address: 'İlker Mah., Dikmen, Çankaya/Ankara',
  workingHours: 'Pazartesi - Cumartesi: 08:00 - 18:00',
};

export const PROJECT_FILTERS = ['Tümü', 'Villa', 'Site', 'Ticari', 'Hobi Bahçesi'];
