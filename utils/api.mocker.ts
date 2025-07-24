import { Page } from '@playwright/test';

export class ApiMocker {
    constructor(private page: Page) {}

    /**
     * Mock API response for specific endpoints
     */
    async mockApiResponse(url: string | RegExp, response: any, status = 200) {
        await this.page.route(url, async (route) => {
            await route.fulfill({
                status,
                contentType: 'application/json',
                body: JSON.stringify(response)
            });
        });
    }

    /**
     * Mock API error response
     */
    async mockApiError(url: string | RegExp, status = 500, error = 'Internal Server Error') {
        await this.page.route(url, async (route) => {
            await route.fulfill({
                status,
                contentType: 'application/json',
                body: JSON.stringify({ error })
            });
        });
    }

    /**
     * Mock network latency
     */
    async mockNetworkLatency(url: string | RegExp, latencyMs: number) {
        await this.page.route(url, async (route) => {
            await new Promise(resolve => setTimeout(resolve, latencyMs));
            await route.continue();
        });
    }

    /**
     * Mock offline mode
     */
    async mockOffline() {
        await this.page.context().setOffline(true);
    }

    /**
     * Clear all mocks
     */
    async clearMocks() {
        await this.page.unroute('**');
        await this.page.context().setOffline(false);
    }
}

// Mock data for common endpoints
export const mockData = {
    searchResults: {
        properties: [
            {
                id: 1,
                title: 'Mock Property',
                location: 'Berlin',
                price: '1000€',
                images: ['mock-image-url']
            }
        ],
        total: 1
    },
    propertyDetails: {
        id: 1,
        title: 'Mock Property',
        description: 'A mock property for testing',
        amenities: ['WiFi', 'Parking'],
        location: {
            lat: 52.520008,
            lng: 13.404954
        }
    }
};
