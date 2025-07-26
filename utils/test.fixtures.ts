import { test as base } from '@playwright/test';
import { ViewportUtils } from './viewport.utils';

// Extend base test fixture with viewport utilities
export const test = base.extend<{
    viewportUtils: ViewportUtils;
}>({
    viewportUtils: async ({ page }, use) => {
        const viewportUtils = new ViewportUtils(page);
        await use(viewportUtils);
    },
});

// Export assertions from base test
export const expect = test.expect;
