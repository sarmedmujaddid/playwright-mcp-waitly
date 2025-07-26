import { test as base } from '@playwright/test';
import { AllureHelper } from './allure.helper';
import { TestDataManager } from './test.data.manager';

type TestFixtures = {
  testData: TestDataManager;
  allure: AllureHelper;
};

export const test = base.extend<TestFixtures>({
  testData: async ({}, use) => {
    const testData = new TestDataManager();
    await testData.load();
    await use(testData);
  },
  
  allure: async ({}, use) => {
    const allure = new AllureHelper();
    await use(allure);
  }
});
