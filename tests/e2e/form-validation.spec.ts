import { test, expect } from '@playwright/test';
import { FormPage } from '../../pages/FormPage';

test.describe('Form Validation Tests', () => {
  let formPage: FormPage;

  test.beforeEach(async ({ page }) => {
    formPage = new FormPage(page);
    await page.goto('https://waitly.eu/listing/rental_housing/869-aden-immobilien-friedrichshain-kreuzberg');
  });

  test('required field validation', async ({ page }) => {
    await formPage.submit();
    await expect(page.locator('.error-message')).toBeVisible();
  });

  test('invalid email validation', async ({ page }) => {
    await formPage.fillEmail('invalid-email');
    await formPage.submit();
    await expect(page.locator('.error-message')).toContainText('valid email');
  });

  test('terms checkbox required', async ({ page }) => {
    await formPage.fillEmail('valid@email.com');
    await formPage.submit();
    await expect(page.locator('.error-message')).toContainText('accept terms');
  });

  test('successful submission', async ({ page }) => {
    await formPage.fillEmail('valid@email.com');
    await page.check('.terms-checkbox');
    await formPage.submit();
    await expect(page.locator('.success-message')).toBeVisible();
  });
});
