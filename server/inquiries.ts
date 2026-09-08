import { z } from 'zod';
import { inquirySchema, type InquiryPayload } from '../shared/projectInquiry.js';
import { buildInquiryId, escapeHtml, getTransporter } from './mail.js';

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
    const textContent = buildInquiryEmailText(data, inquiryId);

    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"TEMUR STUDIO" <${process.env.SMTP_USER}>`,
      to: toEmail,
      replyTo: data.contact.email,
      subject,
      text: textContent,
      html: buildInquiryEmailHtml(data, inquiryId),
      headers: { 'X-Temur-Inquiry-ID': inquiryId },
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

function buildInquiryEmailText(data: InquiryPayload, inquiryId: string) {
  return `
TEMUR STUDIO — YENİ PROJE TALEBİ
Talep No: ${inquiryId}

PROJE ÖZETİ
Proje türü: ${data.type || '-'}
Proje aşaması: ${data.stage || '-'}
Bütçe: ${data.budget || '-'}
Zamanlama: ${data.timeline || '-'}
Kesin teslim tarihi: ${data.hasDeadline ? data.deadlineDate || 'Evet' : 'Belirtilmedi'}

PROJE BRİFİ
${data.goal || '-'}

İHTİYAÇLAR
${data.features?.join(', ') || '-'}
Ek ihtiyaçlar: ${data.otherFeatures || '-'}

İLETİŞİM
Ad soyad: ${data.contact.name}
E-posta: ${data.contact.email}
Telefon: ${data.contact.phone || '-'}
Şirket / marka: ${data.contact.company || '-'}
Tercih edilen iletişim: ${data.contact.preferred}

Bu e-posta TEMUR STUDIO proje formundan otomatik oluşturulmuştur.
  `.trim();
}

export function buildInquiryEmailHtml(data: InquiryPayload, inquiryId: string) {
  const values = {
    inquiryId: escapeHtml(inquiryId),
    type: escapeHtml(data.type || 'Belirtilmedi'),
    goal: escapeHtml(data.goal || 'Proje amacı belirtilmedi.').replace(/\n/g, '<br />'),
    stage: escapeHtml(data.stage || 'Belirtilmedi'),
    features: escapeHtml(data.features?.join(' · ') || 'Belirtilmedi'),
    otherFeatures: escapeHtml(data.otherFeatures || 'Yok'),
    budget: escapeHtml(data.budget || 'Belirtilmedi'),
    timeline: escapeHtml(data.timeline || 'Belirtilmedi'),
    deadline: escapeHtml(data.hasDeadline ? data.deadlineDate || 'Belirtilmedi' : 'Kesin tarih belirtilmedi'),
    name: escapeHtml(data.contact.name),
    email: escapeHtml(data.contact.email),
    phone: escapeHtml(data.contact.phone || 'Belirtilmedi'),
    company: escapeHtml(data.contact.company || 'Belirtilmedi'),
    preferred: escapeHtml(data.contact.preferred),
  };
  const emailHref = escapeHtml(`mailto:${data.contact.email}`);
  const phoneHref = escapeHtml(`tel:${String(data.contact.phone ?? '').replace(/[^+\d]/g, '')}`);
  const submittedAt = new Intl.DateTimeFormat('tr-TR', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Istanbul',
  }).format(new Date());

  return `
<!doctype html>
<html lang="tr">
  <body style="margin:0; padding:0; background:#f2f3f5; color:#111111; font-family:Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%; background:#f2f3f5; padding:32px 12px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%; max-width:680px; background:#ffffff; border:1px solid #e5e7eb;">
          <tr><td style="padding:30px 32px 28px; background:#050508; color:#ffffff;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>
              <td style="font-size:20px; font-weight:700; letter-spacing:-0.6px;">TEMUR <span style="color:#8c8c94; font-weight:400;">STUDIO</span></td>
              <td align="right" style="font-size:11px; color:#a1a1aa; letter-spacing:1.2px; text-transform:uppercase;">Yeni proje talebi</td>
            </tr></table>
            <div style="height:1px; background:#2b2b31; margin:24px 0 18px;"></div>
            <div style="font-size:12px; color:#a1a1aa; letter-spacing:0.6px;">TALEP NO</div>
            <div style="margin-top:5px; font-size:18px; font-weight:700; letter-spacing:0.3px;">${values.inquiryId}</div>
          </td></tr>
          <tr><td style="padding:32px;">
            <p style="margin:0 0 6px; color:#6b7280; font-size:12px; font-weight:700; letter-spacing:1.2px; text-transform:uppercase;">Yeni fırsat</p>
            <h1 style="margin:0; color:#111111; font-size:28px; line-height:1.2; letter-spacing:-0.6px;">${values.type}</h1>
            <p style="margin:12px 0 0; color:#6b7280; font-size:14px; line-height:1.6;">${submittedAt} tarihinde proje formu üzerinden yeni bir talep alındı.</p>

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px; border:1px solid #e5e7eb; border-collapse:collapse;">
              <tr>
                <td width="50%" style="padding:16px; border-right:1px solid #e5e7eb; border-bottom:1px solid #e5e7eb; vertical-align:top;"><div style="color:#6b7280; font-size:11px; font-weight:700; letter-spacing:0.9px; text-transform:uppercase;">Proje aşaması</div><div style="margin-top:7px; color:#111111; font-size:14px; line-height:1.45; font-weight:600;">${values.stage}</div></td>
                <td width="50%" style="padding:16px; border-bottom:1px solid #e5e7eb; vertical-align:top;"><div style="color:#6b7280; font-size:11px; font-weight:700; letter-spacing:0.9px; text-transform:uppercase;">Bütçe</div><div style="margin-top:7px; color:#111111; font-size:14px; line-height:1.45; font-weight:600;">${values.budget}</div></td>
              </tr>
              <tr>
                <td width="50%" style="padding:16px; border-right:1px solid #e5e7eb; vertical-align:top;"><div style="color:#6b7280; font-size:11px; font-weight:700; letter-spacing:0.9px; text-transform:uppercase;">Zamanlama</div><div style="margin-top:7px; color:#111111; font-size:14px; line-height:1.45; font-weight:600;">${values.timeline}</div></td>
                <td width="50%" style="padding:16px; vertical-align:top;"><div style="color:#6b7280; font-size:11px; font-weight:700; letter-spacing:0.9px; text-transform:uppercase;">Teslim tarihi</div><div style="margin-top:7px; color:#111111; font-size:14px; line-height:1.45; font-weight:600;">${values.deadline}</div></td>
              </tr>
            </table>

            <div style="margin-top:32px;"><div style="color:#6b7280; font-size:11px; font-weight:700; letter-spacing:1px; text-transform:uppercase;">Proje brifi</div><div style="margin-top:12px; padding:18px 20px; border-left:3px solid #111111; background:#f7f7f8; color:#27272a; font-size:15px; line-height:1.7;">${values.goal}</div></div>
            <div style="margin-top:30px;"><div style="color:#6b7280; font-size:11px; font-weight:700; letter-spacing:1px; text-transform:uppercase;">İhtiyaçlar</div><p style="margin:10px 0 0; color:#111111; font-size:14px; line-height:1.65;">${values.features}</p><p style="margin:8px 0 0; color:#6b7280; font-size:13px; line-height:1.6;"><strong style="color:#3f3f46;">Ek not:</strong> ${values.otherFeatures}</p></div>

            <div style="margin-top:32px; padding:24px; background:#050508; color:#ffffff;">
              <div style="color:#a1a1aa; font-size:11px; font-weight:700; letter-spacing:1px; text-transform:uppercase;">İletişim kişisi</div>
              <div style="margin-top:8px; font-size:20px; font-weight:700;">${values.name}</div>
              <div style="margin-top:18px; font-size:14px; line-height:1.8;"><div><span style="color:#a1a1aa;">E-posta:</span> <a href="${emailHref}" style="color:#ffffff; text-decoration:underline;">${values.email}</a></div><div><span style="color:#a1a1aa;">Telefon:</span> <a href="${phoneHref}" style="color:#ffffff; text-decoration:underline;">${values.phone}</a></div><div><span style="color:#a1a1aa;">Şirket / marka:</span> ${values.company}</div><div><span style="color:#a1a1aa;">Tercih edilen iletişim:</span> ${values.preferred}</div></div>
              <div style="margin-top:20px;"><a href="${emailHref}" style="display:inline-block; padding:12px 16px; background:#ffffff; color:#050508; font-size:12px; font-weight:700; letter-spacing:0.7px; text-decoration:none; text-transform:uppercase;">E-posta ile yanıtla</a></div>
            </div>
          </td></tr>
          <tr><td style="padding:20px 32px; border-top:1px solid #e5e7eb; color:#71717a; font-size:11px; line-height:1.6;">Bu e-posta TEMUR STUDIO proje formundan otomatik oluşturulmuştur. Yanıt verdiğinizde mesaj doğrudan talep sahibine gider.</td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`.trim();
}
