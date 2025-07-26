import allure from 'allure-playwright';

export class AllureHelper {
    async logStep(name: string, action: () => Promise<void>): Promise<void> {
        await allure.step(name, action);
    }

    async logParameters(params: Record<string, unknown>): Promise<void> {
        for (const [key, value] of Object.entries(params)) {
            await allure.parameter(key, String(value));
        }
    }

    async attachScreenshot(name: string, screenshot: Buffer): Promise<void> {
        await allure.attachment(name, screenshot, 'image/png');
    }

    async logDescription(description: string): Promise<void> {
        await allure.description(description);
    }

    async logIssue(name: string, url: string): Promise<void> {
        await allure.issue(name, url);
    }

    async logTestId(testId: string): Promise<void> {
        await allure.testCase(testId);
    }

    async logSeverity(severity: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial'): Promise<void> {
        await allure.severity(severity);
    }
}
