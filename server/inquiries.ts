import { z } from 'zod';
import { inquirySchema, type InquiryPayload } from '../shared/projectInquiry';
import { buildInquiryId, escapeHtml, getTransporter } from './mail';

export type InquirySubmissionResult =
  | { status: 200; body: { success: true; inquiryId: string } }
  | { status: 400 | 500; body: { error: string } };

/** Keeps local Express and Vercel delivery behavior on one code path. */
export async function processProjectInquiry(payload: unknown): Promise<InquirySubmissionResult> {
  try {
    const data = inquirySchema.parse(payload);

    if (data._hp) {
      return { status: 200, body: { success: true, inquiryId: 'TEM-2026-BOTXX' } };
    }

    const inquiryId = buildInquiryId();
    const toEmail = process.env.TEMUR_INQUIRY_TO_EMAIL;
    const transporter = getTransporter();

    if (!transporter || !toEmail) {
      console.error('[Mail] Project inquiry mail transport is not configured.');
      if (process.env.VITE_PROJECT_INQUIRY_MOCK === 'true') {
        return { status: 200, body: { success: true, inquiryId } };
      }
      return { status: 500, body: { error: 'Sunucu e-posta servisi yapılandırılmamış.' } };
    }

    const subject = `Yeni Proje Talebi — ${data.type || 'Belirtilmedi'} — ${inquiryId}`;
    const textContent = `
Inquiry ID: ${inquiryId}
----------------------------------------
PROJE TÜRÜ: ${data.type || '-'}
AMAÇ: ${data.goal || '-'}
PROJE AŞAMASI: ${data.stage || '-'}
İHTİYAÇLAR: ${data.features?.join(', ') || '-'}
DİĞER İHTİYAÇLAR: ${data.otherFeatures || '-'}
BÜTÇE: ${data.budget || '-'}
ZAMANLAMA: ${data.timeline || '-'}
KESİN TESLİM TARİHİ: ${data.hasDeadline ? data.deadlineDate || 'Evet' : 'Hayır'}
----------------------------------------
İLETİŞİM BİLGİLERİ
İSİM: ${data.contact.name}
E-POSTA: ${data.contact.email}
TELEFON: ${data.contact.phone || '-'}
ŞİRKET / MARKA: ${data.contact.company || '-'}
TERCİH EDİLEN İLETİŞİM: ${data.contact.preferred}
    `.trim();

    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"TEMUR STUDIO" <${process.env.SMTP_USER}>`,
      to: toEmail,
      replyTo: data.contact.email,
      subject,
      text: textContent,
      html: buildInquiryEmailHtml(data, inquiryId),
    });

    return { status: 200, body: { success: true, inquiryId } };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: 400, body: { error: 'Geçersiz veri gönderildi. Lütfen alanları kontrol edin.' } };
    }

    console.error('[API Error] Inquiry submission failed (payload hidden for privacy).');
    return { status: 500, body: { error: 'Talebiniz şu anda gönderilemedi. Lütfen kısa bir süre sonra tekrar deneyin.' } };
  }
}

export function buildInquiryEmailHtml(data: InquiryPayload, inquiryId: string) {
  const values = {
    inquiryId: escapeHtml(inquiryId),
    type: escapeHtml(data.type || '-'),
    goal: escapeHtml(data.goal || '-'),
    stage: escapeHtml(data.stage || '-'),
    features: escapeHtml(data.features?.join(', ') || '-'),
    otherFeatures: escapeHtml(data.otherFeatures || '-'),
    budget: escapeHtml(data.budget || '-'),
    timeline: escapeHtml(data.timeline || '-'),
    deadline: escapeHtml(data.hasDeadline ? data.deadlineDate || 'Evet' : 'Hayır'),
    name: escapeHtml(data.contact.name),
    email: escapeHtml(data.contact.email),
    phone: escapeHtml(data.contact.phone || '-'),
    company: escapeHtml(data.contact.company || '-'),
    preferred: escapeHtml(data.contact.preferred),
  };

  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #111;">Yeni Proje Talebi</h2>
      <p><strong>Talep No:</strong> ${values.inquiryId}</p>
      <hr style="border: 1px solid #eee;" />
      <p><strong>Proje türü:</strong> ${values.type}</p>
      <p><strong>Amaç:</strong><br />${values.goal}</p>
      <p><strong>Proje aşaması:</strong> ${values.stage}</p>
      <p><strong>İhtiyaçlar:</strong> ${values.features}</p>
      <p><strong>Diğer ihtiyaçlar:</strong> ${values.otherFeatures}</p>
      <p><strong>Bütçe:</strong> ${values.budget}</p>
      <p><strong>Zamanlama:</strong> ${values.timeline}</p>
      <p><strong>Kesin teslim tarihi:</strong> ${values.deadline}</p>
      <hr style="border: 1px solid #eee;" />
      <h3 style="color: #111;">İletişim bilgileri</h3>
      <p><strong>İsim:</strong> ${values.name}</p>
      <p><strong>E-posta:</strong> ${values.email}</p>
      <p><strong>Telefon:</strong> ${values.phone}</p>
      <p><strong>Şirket / marka:</strong> ${values.company}</p>
      <p><strong>Tercih edilen iletişim:</strong> ${values.preferred}</p>
    </div>
  `.trim();
}
