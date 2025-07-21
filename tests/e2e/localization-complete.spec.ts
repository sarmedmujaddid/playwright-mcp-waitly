import { test, expect } from '@playwright/test';
import { LocalizationPage } from '../../pages/LocalizationPage';

test.describe('Complete Localization Tests', () => {
  let locPage: LocalizationPage;

  test.beforeEach(async ({ page }) => {
    locPage = new LocalizationPage(page);
    await page.goto('https://waitly.eu');
  });

  test('content translation', async ({ page }) => {
    await locPage.switchLanguage('Dansk');
    await expect(page.locator('h1')).toContainText('Lejebolig');
  });

  test('region specific formats', async ({ page }) => {
    await locPage.switchLanguage('Deutsch');
    // Verify date format (DD.MM.YYYY for German)
    await expect(page.locator('.date-field')).toHaveText(/\d{2}\.\d{2}\.\d{4}/);
  });

  test('map localization', async ({ page }) => {
    await locPage.switchLanguage('Deutsch');
    await expect(page.locator('.map-controls')).toContainText('Karte');
  });
});
