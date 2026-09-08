import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { processProjectInquiry } from '../inquiries';

export const inquiryRouter = Router();

const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Çok fazla talep gönderildi. Lütfen daha sonra tekrar deneyin.' },
  standardHeaders: true,
  legacyHeaders: false,
});

inquiryRouter.post('/project-inquiries', inquiryLimiter, async (req, res) => {
  const result = await processProjectInquiry(req.body);
  res.status(result.status).json(result.body);
});
