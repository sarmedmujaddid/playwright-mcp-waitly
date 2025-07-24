import { Page, Locator } from '@playwright/test';
import { ViewportUtils } from '../utils/viewport.utils';

export class BasePage {
    protected viewportUtils: ViewportUtils;

    constructor(protected page: Page) {
        this.viewportUtils = new ViewportUtils(page);
    }

    /**
     * Enhanced click that ensures element is in viewport and clickable
     */
    async safeClick(locator: Locator): Promise<void> {
        await this.viewportUtils.ensureElementIsClickable(locator);
        await locator.click();
    }

    /**
     * Enhanced fill that ensures element is in viewport
     */
    async safeFill(locator: Locator, value: string): Promise<void> {
        await this.viewportUtils.scrollIntoViewIfNeeded(locator);
        await locator.fill(value);
    }

    /**
     * Checks if element can be interacted with
     */
    async canInteractWith(locator: Locator): Promise<boolean> {
        const isVisible = await locator.isVisible();
        if (!isVisible) return false;

        const isInViewport = await this.viewportUtils.isElementInViewport(locator);
        if (!isInViewport) return false;

        const isClickable = await this.viewportUtils.isElementClickable(locator);
        return isClickable;
    }

    /**
     * Sets viewport size and waits for layout to stabilize
     */
    async setViewport(size: 'mobile' | 'tablet' | 'desktop'): Promise<void> {
        await this.viewportUtils.setViewportSize(size);
        // Wait for any responsive layout changes to complete
        await this.page.waitForTimeout(500);
    }
}
