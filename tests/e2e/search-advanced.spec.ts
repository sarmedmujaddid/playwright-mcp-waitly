import { test, expect } from '@playwright/test';
import { SearchPage } from '../../pages/SearchPage';

test.describe('Advanced Search Tests', () => {
  let searchPage: SearchPage;

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    await page.goto('https://waitly.eu/search');
  });

  test('filter functionality', async ({ page }) => {
    // Add filter tests based on available filters
    await page.click('text=Filters');
    await expect(page.locator('.filter-options')).toBeVisible();
  });

  test('invalid search inputs', async ({ page }) => {
    const invalidInputs = ['!@#$', '   ', '12345'];
    for (const input of invalidInputs) {
      await searchPage.search(input);
      // Verify error handling
      await expect(page.locator('.error-message')).toBeVisible();
    }
  });

  test('search results verification', async ({ page }) => {
    await searchPage.search('Berlin');
    await expect(page.locator('.search-result-item')).toHaveCount(8);
    // Verify result content
    await expect(page.locator('.search-result-item').first()).toContainText('Berlin');
  });
});
