export type ProjectType = 
  | 'Web Sitesi'
  | 'Web Uygulaması'
  | 'Özel Yazılım'
  | 'Local / Masaüstü Program'
  | 'Otomasyon Sistemi'
  | 'AI Entegrasyonu'
  | 'Branding & Dijital Kimlik'
  | 'Emin Değilim';

export type ProjectStage =
  | 'Sadece bir fikir var'
  | 'İhtiyaçlar belli, henüz başlamadık'
  | 'Tasarım mevcut'
  | 'Mevcut bir sistem var'
  | 'Mevcut sistemi yenilemek istiyoruz'
  | 'Devam eden projeye destek gerekiyor';

export type FeatureNeed =
  | 'Responsive Tasarım'
  | 'Yönetim Paneli'
  | 'Üyelik / Giriş'
  | 'Veritabanı'
  | 'Ödeme Sistemi'
  | 'API Entegrasyonu'
  | 'AI Özellikleri'
  | 'Otomasyon'
  | 'E-posta Sistemi'
  | 'Dosya Yönetimi'
  | 'Dashboard / Raporlama'
  | 'SEO'
  | 'Branding'
  | 'Sosyal Medya / Dijital Kimlik'
  | 'Emin Değilim';

export type ProjectBudget =
  | 'Henüz belirlemedim'
  | '₺10.000 – ₺25.000'
  | '₺25.000 – ₺50.000'
  | '₺50.000 – ₺100.000'
  | '₺100.000+'
  | 'Konuşalım';

export type ProjectTimeline =
  | 'Mümkün olan en kısa sürede'
  | '1 ay içinde'
  | '1–3 ay içinde'
  | '3+ ay içinde'
  | 'Henüz belli değil';

export type PreferredContact = 'E-posta' | 'Telefon' | 'WhatsApp';

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
