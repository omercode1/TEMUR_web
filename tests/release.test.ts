import assert from 'node:assert/strict';
import test from 'node:test';
import {
  PROJECT_BUDGETS,
  PROJECT_STAGES,
  PROJECT_TIMELINES,
  PROJECT_TYPES,
  PREFERRED_CONTACTS,
  inquirySchema,
} from '../shared/projectInquiry';
import { escapeHtml } from '../server/mail';
import { buildInquiryEmailHtml } from '../server/inquiries';
import vercelInquiryHandler from '../api/project-inquiries';

test('accepts a valid project inquiry payload', () => {
  const result = inquirySchema.safeParse({
    type: PROJECT_TYPES[0],
    goal: 'Yeni kurumsal web sitesi için bilgi talebi.',
    stage: PROJECT_STAGES[0],
    features: [],
    budget: PROJECT_BUDGETS[0],
    timeline: PROJECT_TIMELINES[0],
    hasDeadline: false,
    contact: {
      name: 'Test Kullanıcı',
      email: 'test@example.com',
      phone: '',
      company: '',
      preferred: PREFERRED_CONTACTS[0],
    },
  });

  assert.equal(result.success, true);
});

test('rejects an invalid contact email', () => {
  const result = inquirySchema.safeParse({
    goal: 'Geçersiz e-posta denemesi.',
    contact: {
      name: 'Test Kullanıcı',
      email: 'invalid-email',
      preferred: PREFERRED_CONTACTS[0],
    },
  });

  assert.equal(result.success, false);
});

test('escapes user-controlled values in inquiry email HTML', () => {
  assert.equal(escapeHtml('<img src=x onerror=alert(1)> & "test"'), '&lt;img src=x onerror=alert(1)&gt; &amp; &quot;test&quot;');
});

test('formats a polished and escaped project inquiry email', () => {
  const data = inquirySchema.parse({
    type: PROJECT_TYPES[0],
    goal: '<img src=x onerror=alert(1)> Yeni web sitesi projesi.',
    stage: PROJECT_STAGES[0],
    features: ['SEO', 'Yönetim Paneli'],
    otherFeatures: 'Raporlama',
    budget: PROJECT_BUDGETS[0],
    timeline: PROJECT_TIMELINES[0],
    hasDeadline: false,
    contact: {
      name: 'Test Kullanıcı',
      email: 'test@example.com',
      phone: '+90 555 000 00 00',
      company: 'Test Marka',
      preferred: PREFERRED_CONTACTS[0],
    },
  });

  const html = buildInquiryEmailHtml(data, 'TEM-2026-TEST');

  assert.match(html, /TEMUR <span[^>]*>STUDIO/);
  assert.match(html, /Proje brifi/);
  assert.match(html, /E-posta ile yanıtla/);
  assert.match(html, /&lt;img src=x onerror=alert\(1\)&gt;/);
  assert.doesNotMatch(html, /<img src=x onerror=/);
});

function createMockResponse() {
  return {
    statusCode: 0,
    headers: {} as Record<string, string>,
    body: undefined as unknown,
    setHeader(key: string, value: string) {
      this.headers[key] = value;
    },
    status(statusCode: number) {
      this.statusCode = statusCode;
      return this;
    },
    json(body: unknown) {
      this.body = body;
      return this;
    },
  };
}

test('Vercel function only accepts POST requests', async () => {
  const response = createMockResponse();

  await vercelInquiryHandler({ method: 'GET' } as never, response as never);

  assert.equal(response.statusCode, 405);
  assert.equal(response.headers.Allow, 'POST');
});

test('Vercel function validates inquiry payloads before delivery', async () => {
  const response = createMockResponse();

  await vercelInquiryHandler(
    { method: 'POST', body: { contact: { name: 'A', email: 'invalid-email', preferred: PREFERRED_CONTACTS[0] } } } as never,
    response as never,
  );

  assert.equal(response.statusCode, 400);
});

test('Vercel function accepts a JSON-string request body', async () => {
  const response = createMockResponse();
  const previousMock = process.env.VITE_PROJECT_INQUIRY_MOCK;
  const previousSmtpHost = process.env.SMTP_HOST;

  process.env.VITE_PROJECT_INQUIRY_MOCK = 'true';
  delete process.env.SMTP_HOST;

  try {
    await vercelInquiryHandler(
      {
        method: 'POST',
        body: JSON.stringify({
          type: PROJECT_TYPES[0],
          goal: 'Vercel JSON body compatibility test.',
          stage: PROJECT_STAGES[0],
          features: [],
          budget: PROJECT_BUDGETS[0],
          timeline: PROJECT_TIMELINES[0],
          hasDeadline: false,
          contact: { name: 'Test Kullanıcı', email: 'test@example.com', phone: '', company: '', preferred: PREFERRED_CONTACTS[0] },
        }),
      } as never,
      response as never,
    );

    assert.equal(response.statusCode, 200);
  } finally {
    if (previousMock === undefined) delete process.env.VITE_PROJECT_INQUIRY_MOCK;
    else process.env.VITE_PROJECT_INQUIRY_MOCK = previousMock;
    if (previousSmtpHost === undefined) delete process.env.SMTP_HOST;
    else process.env.SMTP_HOST = previousSmtpHost;
  }
});
