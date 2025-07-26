import { Page, expect, Locator } from '@playwright/test';
import path from 'path';

export class VisualCompareHelper {
    constructor(private page: Page) {}

    /**
     * Take and compare screenshot of full page
     */
    async compareFullPage(testInfo: string, options: { threshold?: number } = {}): Promise<void> {
        const screenshot = await this.page.screenshot({
            fullPage: true,
        });

        expect(screenshot).toMatchSnapshot({
            name: `${testInfo}-full.png`,
            threshold: options.threshold ?? 0.2
        });
    }

    /**
     * Compare specific element
     */
    async compareElement(locator: Locator, testInfo: string, options: { threshold?: number } = {}): Promise<void> {
        const screenshot = await locator.screenshot();
        
        expect(screenshot).toMatchSnapshot({
            name: `${testInfo}-element.png`,
            threshold: options.threshold ?? 0.2
        });
    }

    /**
     * Compare specific viewport
     */
    async compareViewport(testInfo: string, options: { threshold?: number } = {}): Promise<void> {
        const screenshot = await this.page.screenshot({
            fullPage: false
        });

        expect(screenshot).toMatchSnapshot({
            name: `${testInfo}-viewport.png`,
            threshold: options.threshold ?? 0.2
        });
    }

    /**
     * Compare multiple viewports (responsive testing)
     */
    async compareResponsive(testInfo: string, options: { threshold?: number } = {}): Promise<void> {
        const viewports = [
            { width: 375, height: 667, name: 'mobile' },
            { width: 768, height: 1024, name: 'tablet' },
            { width: 1920, height: 1080, name: 'desktop' }
        ];

        for (const viewport of viewports) {
            await this.page.setViewportSize(viewport);
            // Wait for any responsive layouts to settle
            await this.page.waitForTimeout(500);

            const screenshot = await this.page.screenshot({
                fullPage: false
            });

            expect(screenshot).toMatchSnapshot({
                name: `${testInfo}-${viewport.name}.png`,
                threshold: options.threshold ?? 0.2
            });
        }
    }

    /**
     * Compare excluding dynamic elements
     */
    async compareWithMask(testInfo: string, selectors: string[], options: { threshold?: number } = {}): Promise<void> {
        const screenshot = await this.page.screenshot({
            fullPage: true,
            mask: selectors.map(selector => this.page.locator(selector)),
        });

        expect(screenshot).toMatchSnapshot({
            name: `${testInfo}-masked.png`,
            threshold: options.threshold ?? 0.2
        });
    }
}
