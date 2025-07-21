import { test, expect } from '@playwright/test';
import { PropertyPage } from '../../pages/PropertyPage';

test.describe('Property Detail Tests', () => {
  let propertyPage: PropertyPage;

  test.beforeEach(async ({ page }) => {
    propertyPage = new PropertyPage(page);
    await page.goto('https://waitly.eu/listing/rental_housing/869-aden-immobilien-friedrichshain-kreuzberg');
  });

  test('verify content elements', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.property-description')).toBeVisible();
    await expect(page.locator('.property-price')).toBeVisible();
    await expect(page.locator('.property-availability')).toBeVisible();
  });

  test('image carousel functionality', async ({ page }) => {
    await page.click('.carousel-next');
    // Verify image changed
    await expect(page.locator('.carousel-image.active')).toHaveAttribute('src', /image-2/);
  });

  test('interactive elements', async ({ page }) => {
    await page.click('text=Read more');
    await expect(page.locator('.expanded-content')).toBeVisible();
  });
});
