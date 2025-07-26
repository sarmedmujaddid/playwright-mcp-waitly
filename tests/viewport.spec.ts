import { test, expect } from '../utils/test.fixtures';
import { HomePage } from '../pages/HomePage';

test.describe('Viewport Management Tests', () => {
    test('should handle viewport-related interactions correctly', async ({ page, viewportUtils }) => {
        const homePage = new HomePage(page);
        
        // Test desktop viewport
        await viewportUtils.setViewportSize('desktop');
        await test.step('Desktop viewport interactions', async () => {
            await page.goto('https://waitly.eu');
            // Verify menu is visible and clickable
            const menuButton = page.locator('nav button.menu-toggle');
            expect(await viewportUtils.isElementInViewport(menuButton)).toBeTruthy();
        });

        // Test mobile viewport
        await viewportUtils.setViewportSize('mobile');
        await test.step('Mobile viewport interactions', async () => {
            // Verify hamburger menu appears
            const hamburgerMenu = page.locator('button.hamburger-menu');
            expect(await viewportUtils.isElementInViewport(hamburgerMenu)).toBeTruthy();
            
            // Test scrolling to elements
            const footerLink = page.locator('footer a');
            await viewportUtils.scrollIntoViewIfNeeded(footerLink);
            expect(await viewportUtils.isElementInViewport(footerLink)).toBeTruthy();
        });
    });

    test('should handle dynamic content loading', async ({ page, viewportUtils }) => {
        await page.goto('https://waitly.eu');
        
        // Test scrolling and loading more content
        const loadMoreButton = page.locator('button.load-more');
        await viewportUtils.scrollIntoViewIfNeeded(loadMoreButton);
        
        // Verify button is clickable before interaction
        expect(await viewportUtils.isElementClickable(loadMoreButton)).toBeTruthy();
        
        // Click should now work reliably
        await loadMoreButton.click();
    });
});
