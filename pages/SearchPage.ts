import { Page } from '@playwright/test';

export class SearchPage {
    // Locators for search elements
    private readonly locationInput = '[placeholder="Choose where"]';
    private readonly searchTypeDropdown = '[aria-label="Select type"]';
    private readonly searchButton = 'button:has(img[alt="Magnifying glass icon"])';
    private readonly searchResults = '.property-card';

    constructor(private page: Page) {}

    /**
     * Search for properties or newsletters
     * @param location - City or area name
     * @param searchType - 'Rental housing' or 'Newsletter'
     */
    async search(location: string, searchType: 'Rental housing' | 'Newsletter' = 'Rental housing') {
        await this.page.fill(this.locationInput, location);
        await this.page.selectOption(this.searchTypeDropdown, searchType);
        await this.page.click(this.searchButton);
    }

    /**
     * Get count of search results
     */
    async getResultsCount(): Promise<number> {
        return await this.page.locator(this.searchResults).count();
    }

    /**
     * Verify if location exists in search results
     */
    async hasLocationInResults(location: string): Promise<boolean> {
        const results = this.page.locator(this.searchResults);
        return await results.filter({ hasText: location }).count() > 0;
    }
}