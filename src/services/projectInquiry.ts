/// <reference types="vite/client" />

import { ProjectInquiry } from '../types/project';

export async function submitProjectInquiry(data: ProjectInquiry): Promise<{ success: boolean; error?: string }> {
  // Check if we are in a development environment
  const isDev = import.meta.env.DEV;

  if (!isDev) {
    // Production mode without a real API implementation yet
    return {
      success: false,
      error: "Sistem yapılandırma aşamasındadır. Lütfen talebinizi doğrudan e-posta adresimiz üzerinden iletiniz."
    };
  }

  // Development mock
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('[Dev] Project inquiry mock submission completed. (Payload omitted for privacy)');
      resolve({ success: true });
    }, 1500);
  });
}
