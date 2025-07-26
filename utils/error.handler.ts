import { Page, TestInfo } from '@playwright/test';

export class ErrorHandler {
    constructor(private page: Page, private testInfo: TestInfo) {}

    /**
     * Custom error types for better error handling
     */
    static ErrorTypes = {
        ELEMENT_NOT_FOUND: 'ElementNotFound',
        TIMEOUT: 'Timeout',
        NETWORK: 'NetworkError',
        ASSERTION: 'AssertionError',
        VIEWPORT: 'ViewportError',
        NAVIGATION: 'NavigationError'
    };

    /**
     * Captures error context including screenshots and traces
     */
    async captureErrorContext(error: Error): Promise<void> {
        const timestamp = new Date().toISOString();
        
        // Take screenshot
        await this.page.screenshot({
            path: `${this.testInfo.outputPath()}/error-${timestamp}.png`,
            fullPage: true
        });

        // Capture console logs
        const consoleMessages = await this.page.evaluate(() => {
            return (window as any).consoleLog || [];
        });

        // Save error context
        await this.testInfo.attach('error-context', {
            body: JSON.stringify({
                error: {
                    message: error.message,
                    stack: error.stack,
                    type: error.name
                },
                url: this.page.url(),
                console: consoleMessages,
                timestamp
            }),
            contentType: 'application/json'
        });
    }

    /**
     * Wraps async functions with error handling
     */
    async wrapWithErrorHandling<T>(
        action: () => Promise<T>,
        errorType: string,
        context: string
    ): Promise<T> {
        try {
            return await action();
        } catch (error) {
            await this.captureErrorContext(error as Error);
            throw new Error(`${errorType} in ${context}: ${(error as Error).message}`);
        }
    }

    /**
     * Handles navigation errors
     */
    async handleNavigationError(url: string, error: Error): Promise<void> {
        console.error(`Navigation failed to ${url}:`, error);
        await this.captureErrorContext(error);
        
        // Check common navigation issues
        const response = await this.page.request.get(url).catch(() => null);
        if (!response) {
            throw new Error(`Failed to reach ${url}: Server may be down`);
        }
        if (response.status() >= 400) {
            throw new Error(`Server returned ${response.status()} for ${url}`);
        }
    }

    /**
     * Sets up global error handlers
     */
    async setupGlobalHandlers(): Promise<void> {
        // Handle uncaught exceptions
        this.page.on('pageerror', async (error) => {
            await this.captureErrorContext(error);
            console.error('Page error:', error);
        });

        // Handle console errors
        this.page.on('console', async (msg) => {
            if (msg.type() === 'error') {
                await this.testInfo.attach('console-error', {
                    body: msg.text(),
                    contentType: 'text/plain'
                });
            }
        });

        // Handle network errors
        this.page.on('requestfailed', async (request) => {
            await this.testInfo.attach('network-error', {
                body: JSON.stringify({
                    url: request.url(),
                    failure: request.failure()?.errorText,
                    timestamp: new Date().toISOString()
                }),
                contentType: 'application/json'
            });
        });
    }
}
