import { test, expect } from '@playwright/test';
import { devices } from '@playwright/test';

test.describe('Responsive Design Tests', () => {
  test('mobile layout', async ({ page }) => {
    await test.use(devices['iPhone 12']);
    await page.goto('https://waitly.eu');
    await expect(page.locator('.mobile-menu')).toBeVisible();
  });

  test('tablet layout', async ({ page }) => {
    await test.use(devices['iPad Pro 11']);
    await page.goto('https://waitly.eu');
    await expect(page.locator('.tablet-layout')).toBeVisible();
  });

  test('console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('https://waitly.eu');
    expect(errors.length).toBe(0);
  });
});
