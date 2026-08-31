import { ProjectType, ProjectStage, FeatureNeed, ProjectBudget, ProjectTimeline, PreferredContact } from '../types/project';

export const PROJECT_TYPES: ProjectType[] = [
  'Web Sitesi',
  'Web Uygulaması',
  'Özel Yazılım',
  'Local / Masaüstü Program',
  'Otomasyon Sistemi',
  'AI Entegrasyonu',
  'Branding & Dijital Kimlik',
  'Emin Değilim',
];

export const PROJECT_STAGES: ProjectStage[] = [
  'Sadece bir fikir var',
  'İhtiyaçlar belli, henüz başlamadık',
  'Tasarım mevcut',
  'Mevcut bir sistem var',
  'Mevcut sistemi yenilemek istiyoruz',
  'Devam eden projeye destek gerekiyor',
];

export const FEATURE_NEEDS: FeatureNeed[] = [
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
];

export const PROJECT_BUDGETS: ProjectBudget[] = [
  'Henüz belirlemedim',
  '₺10.000 – ₺25.000',
  '₺25.000 – ₺50.000',
  '₺50.000 – ₺100.000',
  '₺100.000+',
  'Konuşalım',
];

export const PROJECT_TIMELINES: ProjectTimeline[] = [
  'Mümkün olan en kısa sürede',
  '1 ay içinde',
  '1–3 ay içinde',
  '3+ ay içinde',
  'Henüz belli değil',
];

export const PREFERRED_CONTACTS: PreferredContact[] = [
  'E-posta',
  'Telefon',
  'WhatsApp',
];

export const INITIAL_FORM_STATE = {
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
    preferred: 'E-posta' as PreferredContact,
  },
};
