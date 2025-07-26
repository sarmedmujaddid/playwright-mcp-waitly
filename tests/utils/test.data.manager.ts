import fs from 'fs/promises';
import path from 'path';

export class TestDataManager {
    private data: Record<string, any> = {};
    private readonly dataPath = path.join(process.cwd(), 'test-data/test-data.json');

    async load(): Promise<void> {
        try {
            const content = await fs.readFile(this.dataPath, 'utf8');
            this.data = JSON.parse(content);
        } catch (error) {
            console.error('Error loading test data:', error);
            this.data = {};
        }
    }

    get(key: string): any {
        return this.data[key];
    }

    async set(key: string, value: any): Promise<void> {
        this.data[key] = value;
        await this.save();
    }

    private async save(): Promise<void> {
        try {
            await fs.writeFile(this.dataPath, JSON.stringify(this.data, null, 2));
        } catch (error) {
            console.error('Error saving test data:', error);
        }
    }

    getSearchQueries(): string[] {
        return this.data.searchQueries || [];
    }

    getContactFormData(): Record<string, string> {
        return this.data.contactForm || {};
    }

    getTestUrls(): string[] {
        return this.data.urls || [];
    }
}
