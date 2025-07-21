import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test('Homepage loads and navigation works', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();
  await home.clickMenu('Search');
  expect(page.url()).toContain('/search');
});
