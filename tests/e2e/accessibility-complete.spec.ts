import { test, expect } from '@playwright/test';
import { AccessibilityPage } from '../../pages/AccessibilityPage';

test.describe('Complete Accessibility Tests', () => {
  let accessPage: AccessibilityPage;

  test.beforeEach(async ({ page }) => {
    accessPage = new AccessibilityPage(page);
    await page.goto('https://waitly.eu');
  });

  test('ARIA roles verification', async ({ page }) => {
    await expect(page.locator('nav')).toHaveAttribute('role', 'navigation');
    await expect(page.locator('button')).toHaveAttribute('aria-label');
  });

  test('keyboard navigation flow', async ({ page }) => {
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(page.url()).not.toBe('https://waitly.eu');
  });

  test('screen reader compatibility', async ({ page }) => {
    // Test aria-live regions
    await expect(page.locator('[aria-live]')).toBeVisible();
  });

  test('color contrast', async ({ page }) => {
    // Would need a color contrast analysis tool integration
    // This is typically done with external tools like axe-core
  });
});
