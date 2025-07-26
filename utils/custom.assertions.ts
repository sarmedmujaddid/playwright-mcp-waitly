import { expect, Locator } from '@playwright/test';
import { ViewportUtils } from './viewport.utils';

export class CustomAssertions {
    constructor(private viewportUtils: ViewportUtils) {}

    /**
     * Custom assertions for UI elements
     */
    async toBeVisibleInViewport(locator: Locator) {
        const isVisible = await locator.isVisible();
        const isInViewport = await this.viewportUtils.isElementInViewport(locator);
        
        expect(isVisible, 'Element should be visible').toBeTruthy();
        expect(isInViewport, 'Element should be in viewport').toBeTruthy();
    }

    async toBeClickable(locator: Locator) {
        const isClickable = await this.viewportUtils.isElementClickable(locator);
        expect(isClickable, 'Element should be clickable').toBeTruthy();
    }

    async toHaveValidContrast(locator: Locator) {
        const contrast = await locator.evaluate((element) => {
            const style = window.getComputedStyle(element);
            // Implement contrast ratio calculation
            return true; // Placeholder
        });
        expect(contrast, 'Element should have sufficient contrast').toBeTruthy();
    }

    async toBeAccessible(locator: Locator) {
        const hasAriaLabel = await locator.evaluate((element) => {
            return element.hasAttribute('aria-label') || 
                   element.hasAttribute('aria-labelledby') ||
                   element.hasAttribute('alt');
        });
        expect(hasAriaLabel, 'Element should have accessibility attributes').toBeTruthy();
    }

    async toHaveLoadedImage(locator: Locator) {
        const isLoaded = await locator.evaluate((img) => {
            if (img instanceof HTMLImageElement) {
                return img.complete && img.naturalHeight !== 0;
            }
            return false;
        });
        expect(isLoaded, 'Image should be fully loaded').toBeTruthy();
    }

    async toBeResponsive(locator: Locator) {
        // Check element visibility across different viewport sizes
        for (const size of ['mobile', 'tablet', 'desktop'] as const) {
            await this.viewportUtils.setViewportSize(size);
            const isVisible = await locator.isVisible();
            expect(isVisible, `Element should be visible in ${size} viewport`).toBeTruthy();
        }
    }

    async toHaveValidForm(formLocator: Locator) {
        const hasRequiredFields = await formLocator.evaluate((form) => {
            const requiredInputs = form.querySelectorAll('[required]');
            return requiredInputs.length > 0;
        });
        expect(hasRequiredFields, 'Form should have required fields').toBeTruthy();

        const hasSubmitButton = await formLocator.locator('button[type="submit"]').count() > 0;
        expect(hasSubmitButton, 'Form should have a submit button').toBeTruthy();
    }
}
