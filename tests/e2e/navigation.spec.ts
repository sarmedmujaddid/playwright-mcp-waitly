//import { test, expect } from '@playwright/test';
import { test, expect } from '../utils/test.fixtures';
import { HomePage } from '../../pages/HomePage';

test.describe('Complete Navigation Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('verify all main menu items and dropdown functionality', async ({ page }) => {
    // Define menu items with their roles and dropdown items
    const menuItems = [
      { name: 'Rental properties', role: 'link' as const },
      { name: 'Newsletter', role: 'link' as const },
      { name: 'About', role: 'button' as const, dropdownItems: ['For business', 'Blog', 'FAQ'] },
      { name: 'FAQ', role: 'link' as const }
    ];
    
    for (const item of menuItems) {
      const menuItem = page.locator('nav').getByRole(item.role, { name: item.name });
      await expect(menuItem).toBeVisible();

      // Check dropdown items for About button
      if (item.name === 'About') {
        await menuItem.click();
        // Verify each dropdown item is visible
        for (const dropdownItem of item.dropdownItems!) {
          await expect(page.getByRole('link', { name: dropdownItem })).toBeVisible();
        }
      }
    }
  });

test('footer links are working', async ({ page }) => {
  // First, get all footer links
  const footer = page.locator('footer');
  const footerLinks = footer.getByRole('link');
  
  // Get count of links to iterate through
  const count = await footerLinks.count();
  
  // Verify each link has valid href and is visible
  for (let i = 0; i < count; i++) {
    const link = footerLinks.nth(i);
    await expect(link).toBeVisible();
    
    // Get href attribute
    const href = await link.getAttribute('href');
    expect(href).toBeTruthy();
    
    // Skip external links and social media
    if (href?.startsWith('http')) continue;
    
    // Click and verify navigation works
    await link.click();
    await expect(page.url()).not.toBe(homePage.url);
    await page.goBack();
  }
});
});