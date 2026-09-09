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
  await expect(page.getByRole('heading', { name: 'İşiniz için sistemler inşa ediyoruz.' })).toBeVisible();
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

test('service rows stay compact on mobile without hiding their descriptions', async ({ page }) => {
  await page.goto('/');
  await waitForApp(page);

  const services = page.getByTestId('services-section');
  await services.scrollIntoViewIfNeeded();

  const rows = page.getByTestId('service-row');
  await expect(rows).toHaveCount(6);
  await expect(rows.first()).toContainText('Web');

  const heights = await rows.evaluateAll((elements) => elements.map((element) => element.getBoundingClientRect().height));
  expect(Math.max(...heights)).toBeLessThan(210);
});

test('founder section stays visible and contained on mobile', async ({ page }) => {
  await page.goto('/');
  await waitForApp(page);

  const founder = page.getByTestId('founder-section');
  await founder.scrollIntoViewIfNeeded();

  const map = page.getByTestId('founder-map');
  await expect(map).toBeVisible();
  await expect(map).toHaveCSS('opacity', '1');
  await expectNoHorizontalOverflow(page);

  const width = await map.evaluate((element) => Math.round(element.getBoundingClientRect().width));
  expect(width).toBeLessThanOrEqual(280);
});

test('desktop service arrows take visitors to the project start flow', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await waitForApp(page);

  const serviceCtas = page.getByRole('link', { name: /için proje başlat/i });
  await expect(serviceCtas).toHaveCount(6);
  await expect(serviceCtas.first()).toHaveAttribute('href', '/start-project');
  await expect(page.getByTestId('service-row').first()).toHaveCSS('cursor', 'none');
  await expect(serviceCtas.first()).toHaveCSS('cursor', 'none');

  await serviceCtas.first().scrollIntoViewIfNeeded();
  await Promise.all([
    page.waitForURL('**/start-project'),
    serviceCtas.first().click(),
  ]);
});

test('capability statement starts its slow glow sequence after entering the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await waitForApp(page);

  const firstWord = page.getByTestId('text-reveal-word').first();
  await expect(firstWord).toBeVisible();

  const dimmedFilter = await firstWord.evaluate((element) => window.getComputedStyle(element).filter);
  expect(dimmedFilter).toContain('brightness(0.45)');

  await page.evaluate(() => {
    const reveal = document.querySelector('[data-testid="text-reveal"]');
    if (!reveal) throw new Error('Capability statement was not found');

    const rect = reveal.getBoundingClientRect();
    const start = window.scrollY + rect.top - window.innerHeight * 0.72;
    const scrollRoot = document.documentElement;
    const previousScrollBehavior = scrollRoot.style.scrollBehavior;
    scrollRoot.style.scrollBehavior = 'auto';
    window.scrollTo(0, start);
    scrollRoot.style.scrollBehavior = previousScrollBehavior;
  });
  const scrollPosition = await page.evaluate(() => window.scrollY);
  await page.waitForTimeout(1_050);

  const styles = await firstWord.evaluate((element) => {
    const computed = window.getComputedStyle(element);
    return { filter: computed.filter, opacity: Number(computed.opacity), textShadow: computed.textShadow };
  });

  expect(styles.opacity).toBeGreaterThan(0.7);
  expect(styles.filter).toMatch(/brightness\(1\.[1-9]/);
  expect(styles.textShadow).toMatch(/rgba\(255, 255, 255, 0\.[1-9]/);
  expect(await page.evaluate(() => window.scrollY)).toBe(scrollPosition);
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

test.describe('desktop custom cursor coverage', () => {
  test.use({ viewport: { width: 1440, height: 900 }, isMobile: false, hasTouch: false });

  test('no visible element restores the system cursor', async ({ page }) => {
    await page.goto('/');
    await waitForApp(page);

    expect(await page.evaluate(() => matchMedia('(hover: hover) and (pointer: fine)').matches)).toBe(true);

    const findCursorOffenders = () => page.evaluate(() => (
      Array.from(document.body.querySelectorAll('*'))
        .filter((element) => element.getClientRects().length > 0)
        .filter((element) => window.getComputedStyle(element).cursor !== 'none')
        .map((element) => ({
          className: typeof element.className === 'string' ? element.className : '',
          cursor: window.getComputedStyle(element).cursor,
          tag: element.tagName,
        }))
    ));

    expect(await findCursorOffenders()).toEqual([]);

    await page.goto('/start-project');
    await waitForApp(page);
    expect(await findCursorOffenders()).toEqual([]);
  });
});
