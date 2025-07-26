import { readFileSync } from 'fs';
import path from 'path';

export class TestDataManager {
    private static instance: TestDataManager;
    private testData: any;

    private constructor() {
        this.loadTestData();
    }

    /**
     * Get singleton instance
     */
    public static getInstance(): TestDataManager {
        if (!TestDataManager.instance) {
            TestDataManager.instance = new TestDataManager();
        }
        return TestDataManager.instance;
    }

    /**
     * Load test data from JSON file
     */
    private loadTestData(): void {
        const dataPath = path.join(process.cwd(), 'test-data', 'test-data.json');
        this.testData = JSON.parse(readFileSync(dataPath, 'utf8'));
    }

    /**
     * Get user data by type
     */
    public getUserData(type: 'standard' | 'admin'): any {
        return this.testData.users[type];
    }

    /**
     * Get property data by location
     */
    public getPropertyData(location: 'berlin' | 'munich'): any {
        return this.testData.properties[location];
    }

    /**
     * Get search query data
     */
    public getSearchQuery(type: 'valid' | 'invalid', index = 0): any {
        return this.testData.searchQueries[type][index];
    }

    /**
     * Get form data
     */
    public getFormData(formType: 'contact', dataType: 'valid' | 'invalid'): any {
        return this.testData.forms[formType][dataType];
    }

    /**
     * Generate dynamic test data
     */
    public generateDynamicData(type: 'email' | 'phone' | 'name'): string {
        const timestamp = new Date().getTime();
        switch (type) {
            case 'email':
                return `test.user.${timestamp}@example.com`;
            case 'phone':
                return `+49${Math.floor(Math.random() * 1000000000)}`;
            case 'name':
                return `Test User ${timestamp}`;
            default:
                throw new Error(`Unknown data type: ${type}`);
        }
    }
}
