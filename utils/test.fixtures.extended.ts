import { test as base } from '@playwright/test';
import { TestDataManager } from './test.data.manager';
import { AllureHelper } from './allure.helper';
import { VisualCompareHelper } from './visual.compare.helper';

// Extended test fixture type
type TestFixtures = {
    testData: TestDataManager;
    allure: AllureHelper;
    visual: VisualCompareHelper;
};

// Create the extended test fixture
export const test = base.extend<TestFixtures>({
    testData: async ({}, use) => {
        await use(TestDataManager.getInstance());
    },
    allure: async ({ page }, use) => {
        await use(new AllureHelper(page));
    },
    visual: async ({ page }, use) => {
        await use(new VisualCompareHelper(page));
    }
});

// Export expect
export { expect } from '@playwright/test';
