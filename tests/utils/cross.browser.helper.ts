import { Browser, BrowserContext, chromium, firefox, webkit } from '@playwright/test';

export class CrossBrowserHelper {
    private static browsers: Map<string, Browser> = new Map();
    private static contexts: Map<string, BrowserContext> = new Map();

    static async getBrowser(browserType: 'chromium' | 'firefox' | 'webkit'): Promise<Browser> {
        if (!this.browsers.has(browserType)) {
            let browser: Browser;
            switch (browserType) {
                case 'chromium':
                    browser = await chromium.launch();
                    break;
                case 'firefox':
                    browser = await firefox.launch();
                    break;
                case 'webkit':
                    browser = await webkit.launch();
                    break;
                default:
                    throw new Error(`Unsupported browser type: ${browserType}`);
            }
            this.browsers.set(browserType, browser);
        }
        return this.browsers.get(browserType)!;
    }

    static async getContext(browserType: 'chromium' | 'firefox' | 'webkit'): Promise<BrowserContext> {
        if (!this.contexts.has(browserType)) {
            const browser = await this.getBrowser(browserType);
            const context = await browser.newContext({
                viewport: { width: 1920, height: 1080 },
                ignoreHTTPSErrors: true
            });
            this.contexts.set(browserType, context);
        }
        return this.contexts.get(browserType)!;
    }

    static async getFeatures(browserType: 'chromium' | 'firefox' | 'webkit'): Promise<Record<string, boolean>> {
        const context = await this.getContext(browserType);
        const page = await context.newPage();
        
        const features = await page.evaluate(() => ({
            webGL: (() => {
                try {
                    const canvas = document.createElement('canvas');
                    return !!(window.WebGLRenderingContext && 
                        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
                } catch (e) {
                    return false;
                }
            })(),
            webRTC: 'RTCPeerConnection' in window,
            webSocket: 'WebSocket' in window,
            webWorker: 'Worker' in window,
            localStorage: (() => {
                try {
                    return 'localStorage' in window;
                } catch (e) {
                    return false;
                }
            })(),
            indexedDB: 'indexedDB' in window
        }));

        await page.close();
        return features;
    }

    static async cleanup(): Promise<void> {
        for (const context of this.contexts.values()) {
            await context.close();
        }
        for (const browser of this.browsers.values()) {
            await browser.close();
        }
        this.contexts.clear();
        this.browsers.clear();
    }
}
