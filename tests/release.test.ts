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
