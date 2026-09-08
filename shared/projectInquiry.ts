import { z } from 'zod';

export const PROJECT_TYPES = [
  'Web Sitesi',
  'Web Uygulaması',
  'Özel Yazılım',
  'Local / Masaüstü Program',
  'Otomasyon Sistemi',
  'AI Entegrasyonu',
  'Branding & Dijital Kimlik',
  'Emin Değilim',
] as const;

export const PROJECT_STAGES = [
  'Sadece bir fikir var',
  'İhtiyaçlar belli, henüz başlamadık',
  'Tasarım mevcut',
  'Mevcut bir sistem var',
  'Mevcut sistemi yenilemek istiyoruz',
  'Devam eden projeye destek gerekiyor',
] as const;

export const FEATURE_NEEDS = [
  'Responsive Tasarım',
  'Yönetim Paneli',
  'Üyelik / Giriş',
  'Veritabanı',
  'Ödeme Sistemi',
  'API Entegrasyonu',
  'AI Özellikleri',
  'Otomasyon',
  'E-posta Sistemi',
  'Dosya Yönetimi',
  'Dashboard / Raporlama',
  'SEO',
  'Branding',
  'Sosyal Medya / Dijital Kimlik',
  'Emin Değilim',
] as const;

export const OTHER_FEATURE_LABEL = 'Başka bir şey';

export const PROJECT_BUDGETS = [
  'Henüz belirlemedim',
  '₺10.000 – ₺25.000',
  '₺25.000 – ₺50.000',
  '₺50.000 – ₺100.000',
  '₺100.000+',
  'Konuşalım',
] as const;

export const PROJECT_TIMELINES = [
  'Mümkün olan en kısa sürede',
  '1 ay içinde',
  '1–3 ay içinde',
  '3+ ay içinde',
  'Henüz belli değil',
] as const;

export const PREFERRED_CONTACTS = [
  'E-posta',
  'Telefon',
  'WhatsApp',
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];
export type ProjectStage = (typeof PROJECT_STAGES)[number];
export type FeatureNeed = (typeof FEATURE_NEEDS)[number] | typeof OTHER_FEATURE_LABEL;
export type ProjectBudget = (typeof PROJECT_BUDGETS)[number];
export type ProjectTimeline = (typeof PROJECT_TIMELINES)[number];
export type PreferredContact = (typeof PREFERRED_CONTACTS)[number];

export interface ProjectInquiry {
  type: ProjectType | null;
  goal: string;
  stage: ProjectStage | null;
  features: FeatureNeed[];
  otherFeatures?: string;
  budget: ProjectBudget | null;
  timeline: ProjectTimeline | null;
  hasDeadline: boolean;
  deadlineDate?: string;
  contact: {
    name: string;
    email: string;
    phone: string;
    company: string;
    preferred: PreferredContact;
  };
}

export const INITIAL_FORM_STATE: ProjectInquiry = {
  type: null,
  goal: '',
  stage: null,
  features: [],
  otherFeatures: '',
  budget: null,
  timeline: null,
  hasDeadline: false,
  deadlineDate: '',
  contact: {
    name: '',
    email: '',
    phone: '',
    company: '',
    preferred: 'E-posta',
  },
};

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Ad soyad en az 2 karakter olmalıdır.').max(100, 'İsim çok uzun'),
  email: z.string().trim().email('Geçerli bir e-posta adresi girin.').max(254),
  phone: z.string().max(50).optional(),
  company: z.string().max(150).optional(),
  preferred: z.enum(PREFERRED_CONTACTS),
});

export const inquirySchema = z.object({
  type: z.enum(PROJECT_TYPES).nullable().optional(),
  goal: z.string().max(2000, 'Amaç metni çok uzun'),
  stage: z.enum(PROJECT_STAGES).nullable().optional(),
  features: z.array(z.string()).optional(),
  otherFeatures: z.string().max(500, 'Ek özellikler metni çok uzun').optional(),
  budget: z.enum(PROJECT_BUDGETS).nullable().optional(),
  timeline: z.enum(PROJECT_TIMELINES).nullable().optional(),
  hasDeadline: z.boolean().optional(),
  deadlineDate: z.string().max(50).optional(),
  contact: contactSchema,
  _hp: z.string().optional(),
});

export type InquiryPayload = z.infer<typeof inquirySchema>;
