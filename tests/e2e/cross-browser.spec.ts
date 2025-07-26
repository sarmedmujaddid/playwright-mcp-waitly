import { test } from '../utils/test.fixtures.extended';
import { CrossBrowserHelper } from '../utils/cross.browser.helper';

test.describe('Cross Browser Tests', () => {
    test('should display search results correctly across browsers @cross-browser', async ({ 
        page, 
        context,
        testData,
        allure 
    }) => {
        const crossBrowser = new CrossBrowserHelper(page, context, allure);
        const searchData = testData.getSearchQuery('valid', 0);

        await allure.step('Setup browser environment', async () => {
            await crossBrowser.logBrowserCapabilities();
            await crossBrowser.setupErrorHandling();
            await crossBrowser.setupBrowserDialogs();
        });

        await allure.step('Check browser features', async () => {
            const features = await crossBrowser.checkFeatureSupport();
            AllureHelper.logParameters({ browserFeatures: features });
        });

        await allure.step('Navigate to homepage', async () => {
            await page.goto('/');
            await allure.attachScreenshot('Homepage');
        });

        await allure.step('Perform search', async () => {
            await page.fill('.search-input', searchData.location);
            await page.click('.search-button');
            await page.waitForSelector('.property-card');
            await allure.attachScreenshot('Search Results');
        });

        await allure.step('Verify responsive layout', async () => {
            // Test different viewport sizes
            for (const viewport of ['mobile', 'tablet', 'desktop']) {
                if (viewport === 'mobile') {
                    await page.setViewportSize({ width: 375, height: 667 });
                } else if (viewport === 'tablet') {
                    await page.setViewportSize({ width: 768, height: 1024 });
                } else {
                    await page.setViewportSize({ width: 1920, height: 1080 });
                }

                await page.waitForTimeout(500); // Wait for layout to settle
                await allure.attachScreenshot(`${viewport}-layout`);

                // Verify critical elements are visible
                const searchVisible = await page.locator('.search-container').isVisible();
                const resultsVisible = await page.locator('.property-card').first().isVisible();

                test.expect(searchVisible, `Search should be visible in ${viewport}`).toBeTruthy();
                test.expect(resultsVisible, `Results should be visible in ${viewport}`).toBeTruthy();
            }
        });

        await allure.step('Test interactions', async () => {
            // Test hover states (if supported)
            const features = await crossBrowser.checkFeatureSupport();
            if (!features.touchscreen) {
                await page.hover('.property-card');
                await allure.attachScreenshot('Property Card Hover');
            }

            // Test click interactions
            await page.click('.property-card');
            await page.waitForSelector('.property-details');
            await allure.attachScreenshot('Property Details');
        });
    });

    test('should handle form submission across browsers @cross-browser', async ({
        page,
        context,
        testData,
        allure
    }) => {
        const crossBrowser = new CrossBrowserHelper(page, context, allure);
        const formData = testData.getFormData('contact', 'valid');

        await crossBrowser.logBrowserCapabilities();
        await crossBrowser.setupErrorHandling();

        await allure.step('Navigate to contact form', async () => {
            await page.goto('/contact');
            await allure.attachScreenshot('Contact Form');
        });

        await allure.step('Fill and submit form', async () => {
            await page.fill('#name', formData.name);
            await page.fill('#email', formData.email);
            await page.fill('#message', formData.message);
            
            await allure.attachScreenshot('Filled Form');
            await page.click('button[type="submit"]');
            
            await page.waitForSelector('.success-message');
            await allure.attachScreenshot('Form Submission Result');
        });
    });
});
