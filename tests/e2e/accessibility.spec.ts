import { test } from '@playwright/test';
import { AccessibilityPage } from '../../pages/AccessibilityPage';

test('Tab navigation works', async ({ page }) => {
  const access = new AccessibilityPage(page);
  await page.goto('https://waitly.eu');
  await access.checkTabNavigation();
  // Add assertion for focus state as needed
});
