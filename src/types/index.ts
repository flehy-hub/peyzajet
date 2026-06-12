import type { ImageSourcePropType } from 'react-native';

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
  image: ImageSourcePropType;
  category: string;
}

export interface BeforeAfter {
  id: string;
  title: string;
  category: string;
  area: string;
  location: string;
  beforeImage: ImageSourcePropType;
  afterImage: ImageSourcePropType;
}

export interface Package {
  id: string;
  name: string;
  priceMin: string;
  priceMax: string;
  area: string;
  frequency: string;
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

/* ── Maliyet Hesaplama v2 ── */
export interface CostFormData {
  projectType: string;
  area: number;
  includeDesign: boolean;
  applications: string[];
  plantLevel: string;
  materialQuality: string;
  terrain: string;
}

export interface CostBreakdown {
  soilPrep: { min: number; max: number };
  designFee: { min: number; max: number };
  applicationCosts: Record<string, { min: number; max: number }>;
  materialTotal: { min: number; max: number };
  overhead: { min: number; max: number };
  subtotal: { min: number; max: number };
  vat: { min: number; max: number };
  grandTotal: { min: number; max: number };
}

export interface ProjectMeta {
  estimatedDuration: string;
  teamSize: string;
  irrigationZones: string;
  yearlyMaintenance: string;
  difficulty: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  message: string;
}

export type ThemeMode = 'light' | 'dark';
