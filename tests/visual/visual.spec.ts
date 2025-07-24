import { test, expect } from '@playwright/test';
import { VisualCompareHelper } from '../utils/visual.compare.helper';
import { AllureHelper } from '../utils/allure.helper';

test.describe('Visual Regression Tests', () => {
    test('homepage visual comparison @visual', async ({ page }) => {
        const visual = new VisualCompareHelper(page);
        const allure = new AllureHelper(page);

        await allure.step('Compare homepage across viewports', async () => {
            await page.goto('/');
            await visual.compareResponsive('homepage', { threshold: 0.1 });
        });

        await allure.step('Compare search component', async () => {
            const searchBox = page.locator('.search-container');
            await visual.compareElement(searchBox, 'search-component');
        });

        await allure.step('Compare with masked dynamic content', async () => {
            await visual.compareWithMask('homepage-masked', [
                '.date-time',
                '.dynamic-ads',
                '.user-specific-content'
            ]);
        });
    });

    test('property details visual comparison @visual', async ({ page }) => {
        const visual = new VisualCompareHelper(page);
        const allure = new AllureHelper(page);

        await allure.step('Navigate to property details', async () => {
            // Navigate to a specific property
            await page.goto('/property/sample-id');
            await visual.compareFullPage('property-details');
        });

        await allure.step('Compare image gallery', async () => {
            const gallery = page.locator('.property-gallery');
            await visual.compareElement(gallery, 'property-gallery');
        });

        await allure.step('Compare responsive layout', async () => {
            await visual.compareResponsive('property-responsive');
        });
    });
});
