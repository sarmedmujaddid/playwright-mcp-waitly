import { test as base, expect } from '@playwright/test';

// Extend the base test with cookie consent handling
export const test = base.extend({
    page: async ({ page }, use) => {
        // Navigate to page
        await page.goto('/');
        
        // Handle cookie consent
        const consentBanner = page.locator('dialog[aria-label="Denne hjemmeside bruger cookies"]');
        if (await consentBanner.isVisible()) {
            await page.click('button:text("Tillad alle cookies")');
        }
        
        await use(page);
    }
});

export { expect };