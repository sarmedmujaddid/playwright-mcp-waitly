import { test, expect } from '@playwright/test';
import { SearchPage } from '../../pages/SearchPage';

test('Search for Berlin returns results', async ({ page }) => {
  const search = new SearchPage(page);
  await page.goto('https://waitly.eu/search');
  await search.search('Berlin');
  expect(await page.locator('text=Berlin').count()).toBeGreaterThan(0);
});
