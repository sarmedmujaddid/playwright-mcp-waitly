import { test, expect } from '@playwright/test';
import { LocalizationPage } from '../../pages/LocalizationPage';

test('Switch language to Dansk', async ({ page }) => {
  const loc = new LocalizationPage(page);
  await page.goto('https://waitly.eu');
  await loc.switchLanguage('Dansk');
  // Add assertion for language change as needed
});
