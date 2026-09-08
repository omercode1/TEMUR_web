import type { IncomingMessage, ServerResponse } from 'node:http';
import { processProjectInquiry } from '../server/inquiries.js';

type VercelRequest = IncomingMessage & { body?: unknown };
type VercelResponse = ServerResponse & {
  status(statusCode: number): VercelResponse;
  json(body: unknown): VercelResponse;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Yalnızca POST istekleri kabul edilir.' });
  }

  const result = await processProjectInquiry(parseRequestBody(req.body));
  return res.status(result.status).json(result.body);
}

function parseRequestBody(body: unknown) {
  if (typeof body !== 'string' && !Buffer.isBuffer(body)) return body;

  try {
    return JSON.parse(Buffer.isBuffer(body) ? body.toString('utf8') : body);
  } catch {
    return undefined;
  }
}
