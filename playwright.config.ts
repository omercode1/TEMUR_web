import { defineConfig } from '@playwright/test';

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
    launchOptions: {
      executablePath: 'C:/Users/omert/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe',
    },
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:3005',
    reuseExistingServer: true,
  },
});
