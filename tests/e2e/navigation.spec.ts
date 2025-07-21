import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Complete Navigation Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('verify all main menu items', async ({ page }) => {
    const menuItems = ['Home', 'Search', 'About', 'Contact'];
    for (const item of menuItems) {
      await expect(page.getByRole('link', { name: item })).toBeVisible();
    }
  });

  test('hover interactions on menu items', async ({ page }) => {
    await page.hover('text=About');
    await expect(page.locator('.dropdown-menu')).toBeVisible();
  });

  test('footer links are working', async ({ page }) => {
    const footerLinks = ['FAQ', 'Terms and conditions', 'Privacy Policy'];
    for (const link of footerLinks) {
      await page.click(`text=${link}`);
      await expect(page.url()).not.toBe('https://waitly.eu');
      await page.goBack();
    }
  });
});
