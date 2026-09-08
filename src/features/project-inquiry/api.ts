import { ProjectInquiry } from '@shared/projectInquiry';

export async function submitProjectInquiry(
  data: ProjectInquiry,
): Promise<{ success: boolean; error?: string; inquiryId?: string }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const response = await fetch('/api/project-inquiries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const result = await response.json();

    if (!response.ok) {
      if (response.status === 429) {
        return { success: false, error: 'Çok fazla talep gönderildi. Lütfen daha sonra tekrar deneyin.' };
      }
      return {
        success: false,
        error: result.error || 'Talebiniz şu anda gönderilemedi. Lütfen kısa bir süre sonra tekrar deneyin.',
      };
    }

    return { success: true, inquiryId: result.inquiryId };
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { success: false, error: 'Bağlantı zaman aşımına uğradı. Lütfen internet bağlantınızı kontrol edin.' };
    }
    console.error('Project inquiry submission error:', error);
    return { success: false, error: 'Sistem şu anda gönderimleri kabul edemiyor. Lütfen daha sonra tekrar deneyin.' };
  }
}
