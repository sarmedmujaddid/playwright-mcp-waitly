import { allure } from 'allure-playwright';
import { Page } from '@playwright/test';

export class AllureHelper {
    constructor(private page: Page) {}

    /**
     * Add step to Allure report
     */
    async step(name: string, action: () => Promise<void>): Promise<void> {
        await allure.step(name, async () => {
            await action();
        });
    }

    /**
     * Attach screenshot to Allure report
     */
    async attachScreenshot(name: string): Promise<void> {
        const screenshot = await this.page.screenshot();
        await allure.attachment(name, screenshot, {
            contentType: 'image/png'
        });
    }

    /**
     * Add test description
     */
    static addTestDescription(description: string): void {
        allure.description(description);
    }

    /**
     * Add test severity
     */
    static setTestSeverity(severity: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial'): void {
        allure.severity(severity);
    }

    /**
     * Add test tags
     */
    static addTestTags(...tags: string[]): void {
        allure.tag(...tags);
    }

    /**
     * Log test parameters
     */
    static logParameters(params: Record<string, any>): void {
        Object.entries(params).forEach(([key, value]) => {
            allure.parameter(key, String(value));
        });
    }

    /**
     * Attach console logs
     */
    async attachConsoleLogs(): Promise<void> {
        const logs = await this.page.evaluate(() => {
            return (window as any).consoleLog || [];
        });
        await allure.attachment(
            'Console Logs',
            JSON.stringify(logs, null, 2),
            { contentType: 'application/json' }
        );
    }

    /**
     * Attach network requests
     */
    async attachNetworkLogs(): Promise<void> {
        const requests = await this.page.evaluate(() => {
            return (window as any).networkRequests || [];
        });
        await allure.attachment(
            'Network Requests',
            JSON.stringify(requests, null, 2),
            { contentType: 'application/json' }
        );
    }
}
