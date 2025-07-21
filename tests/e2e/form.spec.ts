import { test, expect } from '@playwright/test';
import { FormPage } from '../../pages/FormPage';

test('Contact form email validation', async ({ page }) => {
  const form = new FormPage(page);
  await page.goto('https://waitly.eu/listing/rental_housing/869-aden-immobilien-friedrichshain-kreuzberg');
  await form.fillEmail('qa.tester@waitly.eu');
  await form.submit();
  // Add assertion for success/error message as needed
});
