export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  category?: string;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  type: 'villa' | 'site' | 'ticari' | 'hobi';
  area: number;
  duration: string;
  image: string;
  category: string;
}

export interface BeforeAfter {
  id: string;
  title: string;
  beforeImage: string;
  afterImage: string;
}

export interface Package {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  commercialPrice?: string;
  commercialOriginalPrice?: string;
  period: string;
  features: string[];
  popular?: boolean;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  comment: string;
  rating: number;
  location: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface QuoteFormData {
  area: number;
  serviceType: string;
  gardenType: string;
  plantDensity: string;
  hasLighting: boolean;
  hasIrrigation: boolean;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  message: string;
}

export type ThemeMode = 'light' | 'dark';
