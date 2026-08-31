import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, "Ad soyad en az 2 karakter olmalıdır."),
  email: z.string().email("Geçerli bir e-posta adresi girin."),
  phone: z.string().optional(),
  company: z.string().optional(),
  preferred: z.enum(["E-posta", "Telefon", "WhatsApp"])
});
