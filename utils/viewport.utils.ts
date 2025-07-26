import { Page, Locator } from '@playwright/test';

export class ViewportUtils {
    constructor(private page: Page) {}

    /**
     * Checks if an element is within the current viewport
     */
    async isElementInViewport(locator: Locator): Promise<boolean> {
        const element = await locator.elementHandle();
        if (!element) return false;

        return await this.page.evaluate((el) => {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }, element);
    }

    /**
     * Scrolls element into view if not visible
     */
    async scrollIntoViewIfNeeded(locator: Locator): Promise<void> {
        const isVisible = await this.isElementInViewport(locator);
        if (!isVisible) {
            await locator.scrollIntoViewIfNeeded();
            // Wait for any smooth scrolling to complete
            await this.page.waitForTimeout(500);
        }
    }

    /**
     * Ensures element is visible and clickable in viewport
     */
    async ensureElementIsClickable(locator: Locator): Promise<void> {
        await this.scrollIntoViewIfNeeded(locator);
        await locator.waitFor({ state: 'visible' });
        
        // Double-check viewport position after waiting
        const isVisible = await this.isElementInViewport(locator);
        if (!isVisible) {
            throw new Error('Element is still not visible in viewport after scrolling');
        }
    }

    /**
     * Sets viewport size with predefined presets
     */
    async setViewportSize(preset: 'mobile' | 'tablet' | 'desktop'): Promise<void> {
        const viewports = {
            mobile: { width: 375, height: 667 },
            tablet: { width: 768, height: 1024 },
            desktop: { width: 1920, height: 1080 }
        };
        
        await this.page.setViewportSize(viewports[preset]);
    }

    /**
     * Checks if element is clickable without any overlays
     */
    async isElementClickable(locator: Locator): Promise<boolean> {
        const element = await locator.elementHandle();
        if (!element) return false;

        return await this.page.evaluate((el) => {
            const rect = el.getBoundingClientRect();
            const center = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };

            // Check if any element is overlaying our target at its center point
            const overlayingElement = document.elementFromPoint(center.x, center.y);
            return el.contains(overlayingElement) || el === overlayingElement;
        }, element);
    }
}
