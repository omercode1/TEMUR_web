import { defineConfig } from '@playwright/test';

const chromeExecutablePath = process.env.PLAYWRIGHT_CHROME_EXECUTABLE
  ?? (process.platform === 'win32'
    ? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
    : undefined);

export default defineConfig({
  testDir: './tests',
  testMatch: 'mobile.spec.ts',
  timeout: 30_000,
  use: {
    baseURL: 'http://127.0.0.1:3005',
    browserName: 'chromium',
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 1,
    launchOptions: chromeExecutablePath ? { executablePath: chromeExecutablePath } : {},
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:3005',
    reuseExistingServer: true,
  },
});
