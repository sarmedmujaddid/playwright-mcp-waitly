import { Page, BrowserContext } from '@playwright/test';
import { AllureHelper } from './allure.helper';

export class CrossBrowserHelper {
    constructor(
        private page: Page,
        private context: BrowserContext,
        private allure: AllureHelper
    ) {}

    /**
     * Get browser-specific information
     */
    async getBrowserInfo(): Promise<{
        name: string;
        version: string;
        userAgent: string;
    }> {
        const userAgent = await this.page.evaluate(() => navigator.userAgent);
        const browserName = this.context.browser()?.browserType().name() || 'unknown';
        const version = await this.page.evaluate(() => navigator.appVersion);

        return {
            name: browserName,
            version: version,
            userAgent: userAgent
        };
    }

    /**
     * Log browser capabilities
     */
    async logBrowserCapabilities(): Promise<void> {
        const browserInfo = await this.getBrowserInfo();
        await this.allure.step('Browser Information', async () => {
            await this.allure.logParameters({
                browser: browserInfo.name,
                version: browserInfo.version,
                userAgent: browserInfo.userAgent
            });
        });
    }

    /**
     * Check browser-specific feature support
     */
    async checkFeatureSupport(): Promise<Record<string, boolean>> {
        return await this.page.evaluate(() => ({
            webp: document.createElement('canvas')
                .toDataURL('image/webp')
                .indexOf('data:image/webp') === 0,
            webgl: !!document.createElement('canvas')
                .getContext('webgl'),
            grid: CSS.supports('display: grid'),
            flexbox: CSS.supports('display: flex'),
            touchscreen: 'ontouchstart' in window
        }));
    }

    /**
     * Handle browser-specific dialogs
     */
    async setupBrowserDialogs(): Promise<void> {
        this.page.on('dialog', async dialog => {
            await this.allure.step(`Browser Dialog: ${dialog.type()}`, async () => {
                await dialog.accept();
            });
        });
    }

    /**
     * Setup browser-specific network conditions
     */
    async setupNetworkConditions(throttling?: {
        downloadSpeed?: number;
        uploadSpeed?: number;
        latency?: number;
    }): Promise<void> {
        if (this.context.browser()?.browserType().name() === 'chromium' && throttling) {
            const client = await this.context.newCDPSession(this.page);
            await client.send('Network.enable');
            await client.send('Network.emulateNetworkConditions', {
                offline: false,
                downloadThroughput: throttling.downloadSpeed ?? 0,
                uploadThroughput: throttling.uploadSpeed ?? 0,
                latency: throttling.latency ?? 0
            });
        }
    }

    /**
     * Setup browser-specific error handling
     */
    async setupErrorHandling(): Promise<void> {
        this.page.on('pageerror', async error => {
            await this.allure.step('Browser JavaScript Error', async () => {
                await this.allure.logParameters({
                    error: error.message,
                    stack: error.stack
                });
            });
        });

        this.page.on('console', async msg => {
            if (msg.type() === 'error') {
                await this.allure.step('Browser Console Error', async () => {
                    await this.allure.logParameters({
                        text: msg.text(),
                        type: msg.type()
                    });
                });
            }
        });
    }
}
