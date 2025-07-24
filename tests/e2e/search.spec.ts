import { test, expect } from '../utils/test.fixtures';
import { SearchPage } from '../../pages/SearchPage';


test.describe('Search Functionality', () => {
  let searchPage: SearchPage;

    test.beforeEach(async ({ page }) => {
        searchPage = new SearchPage(page);
        await page.goto('/');

    });

    test.describe('Basic Search', () => {
        test('should search for rental properties @smoke', async ({ page }) => {
            await searchPage.search('Berlin', 'Rental housing');
            const resultsCount = await searchPage.getResultsCount();
            expect(resultsCount).toBeGreaterThan(0);
            expect(await searchPage.hasLocationInResults('Berlin')).toBeTruthy();
        });

        test('should search for newsletters @smoke', async ({ page }) => {
            await searchPage.search('Hamburg', 'Newsletter');
            const resultsCount = await searchPage.getResultsCount();
            expect(resultsCount).toBeGreaterThan(0);
            expect(await searchPage.hasLocationInResults('Hamburg')).toBeTruthy();
        });

        test('should handle invalid search inputs @negative', async ({ page }) => {
            const invalidInputs = ['!@#$', '   ', '12345'];
            for (const input of invalidInputs) {
                await searchPage.search(input, 'Rental housing');
                expect(await searchPage.getResultsCount()).toBe(0);
            }
        });

        test('should handle empty location search @negative', async ({ page }) => {
            await page.fill('[placeholder="Choose where"]', '');
            await expect(page.locator(searchPage['searchButton'])).toBeDisabled();
        });
    });
});