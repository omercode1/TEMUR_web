import { expect, test, type Page } from '@playwright/test';

async function waitForApp(page: Page) {
  await page.waitForTimeout(2_400);
  await expect(page.locator('#root')).not.toBeEmpty();
}

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewportWidth);
}

test('home page works at a touch viewport without horizontal overflow', async ({ page }) => {
  await page.goto('/');
  await waitForApp(page);
  await expect(page.getByRole('heading', { name: 'Sistemler inşa ediyoruz.' })).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await page.getByRole('button', { name: 'Menüyü aç' }).click();
  await expect(page.getByRole('navigation', { name: 'Mobil navigasyon' })).toBeVisible();
  await page.getByRole('navigation', { name: 'Mobil navigasyon' }).getByRole('link', { name: 'Hizmetler' }).click();
  await expect(page.locator('#services')).toBeInViewport();
  await expectNoHorizontalOverflow(page);
});

test('home page remains usable at a narrow touch viewport from top to footer', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('/');
  await waitForApp(page);
  await expectNoHorizontalOverflow(page);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(page.getByRole('button', { name: 'Sayfanın başına dön' })).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await page.getByRole('button', { name: 'Sayfanın başına dön' }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(10);
});

test('project form avoids automatic mobile focus and keeps its full flow within the viewport width', async ({ page }) => {
  await page.goto('/start-project');
  await waitForApp(page);
  await page.getByRole('button', { name: 'Başlayalım' }).click();
  await page.getByRole('button', { name: 'Web Sitesi' }).click();
  await page.getByRole('button', { name: /Devam Et/i }).click();

  const goalField = page.locator('textarea');
  await expect(goalField).toBeVisible();
  await expect(goalField).not.toBeFocused();
  await expectNoHorizontalOverflow(page);

  await goalField.fill('Mobil uyumlu yeni bir kurumsal web sitesi istiyoruz.');
  await page.getByRole('button', { name: /Devam Et/i }).click();
  await expect(page.getByRole('heading', { name: /hangi aşamada/i })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});
