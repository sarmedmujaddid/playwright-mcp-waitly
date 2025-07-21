import { test, expect } from '@playwright/test';
import { PropertyPage } from '../../pages/PropertyPage';

test('Open first property detail page', async ({ page }) => {
  const property = new PropertyPage(page);
  await page.goto('https://waitly.eu/search');
  await property.openFirstProperty();
  expect(page.url()).toContain('/listing');
});
