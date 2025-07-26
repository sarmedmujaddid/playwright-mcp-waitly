# Waitly.eu Test Automation Framework

## Overview
This framework provides automated testing for Waitly.eu using Playwright. It includes end-to-end testing, visual regression testing, cross-browser testing, and comprehensive reporting.

## 🚀 Quick Start

### Prerequisites
- Node.js 16 or higher
- npm 7 or higher
- Visual Studio Code (recommended)

### Installation
```bash
# Clone the repository
git clone https://github.com/sarmedmujaddid/playwright-mcp-waitly.git

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## 🏗 Framework Structure
```
playwright-mcp-waitly/
├── tests/
│   ├── e2e/                 # End-to-end tests
│   ├── visual/             # Visual regression tests
│   └── fixtures/           # Test fixtures
├── pages/                  # Page Object Models
├── utils/                  # Utility functions and helpers
├── test-data/             # Test data management
├── allure-results/        # Test reports
└── config/                # Configuration files
```

## 🧪 Running Tests

### Basic Test Commands
```bash
# Run all tests
npm test

# Run tests in headed mode
npm run test:headed

# Run specific test file
npm test tests/e2e/search.spec.ts

# Run tests with specific tag
npm test -- --grep "@smoke"
```

### Cross-Browser Testing
```bash
# Run tests in all desktop browsers
npm run test:cross-browser

# Run tests in mobile browsers
npm run test:mobile

# Run tests in tablet browsers
npm run test:tablet
```

### Visual Testing
```bash
# Run visual regression tests
npm run test:visual

# Update visual baselines
npm run test:visual:update
```

## 📊 Test Reporting

### Allure Reports
```bash
# Generate Allure report
npm run report:allure

# Open Allure report
npm run report:open
```

## 🛠 Framework Components

### 1. Page Object Model
- Located in `/pages` directory
- Each page has its own class
- Implements page-specific methods and locators

Example:
```typescript
// pages/HomePage.ts
export class HomePage extends BasePage {
    private searchInput = this.page.locator('.search-input');
    
    async searchForLocation(location: string) {
        await this.safeFill(this.searchInput, location);
    }
}
```

### 2. Test Data Management
- Located in `/test-data` directory
- JSON-based test data storage
- Dynamic data generation capabilities

Usage:
```typescript
const testData = TestDataManager.getInstance();
const searchData = testData.getSearchQuery('valid', 0);
```

### 3. Visual Testing
- Located in `/utils/visual.compare.helper.ts`
- Supports full page, element, and responsive comparisons
- Configurable threshold settings

Usage:
```typescript
const visual = new VisualCompareHelper(page);
await visual.compareResponsive('homepage');
```

### 4. Cross-Browser Testing
- Configured in `playwright.config.ts`
- Supports multiple browsers and devices
- Browser-specific feature detection

### 5. Custom Utilities
- Viewport management
- Error handling
- Network request monitoring
- Custom assertions

## 🔍 Best Practices

### 1. Writing Tests
- Use descriptive test names
- Follow the AAA pattern (Arrange, Act, Assert)
- Keep tests independent
- Use appropriate tags for categorization

Example:
```typescript
test('should display search results for valid location @smoke', async ({
    page,
    testData
}) => {
    // Arrange
    const searchData = testData.getSearchQuery('valid', 0);
    
    // Act
    await page.goto('/');
    await page.fill('.search-input', searchData.location);
    
    // Assert
    await expect(page.locator('.results')).toBeVisible();
});
```

### 2. Maintenance Guidelines
- Keep page objects updated with UI changes
- Maintain test data separately from test logic
- Update visual baselines when UI changes are approved
- Document all custom utilities and helpers

### 3. Common Issues and Solutions

#### Issue: Tests are flaky
Solution:
- Add appropriate waits
- Use `safeFill` and `safeClick` methods
- Implement retry mechanisms for network requests

#### Issue: Visual tests failing
Solution:
- Check for dynamic content
- Adjust threshold values
- Update baselines if changes are intentional

## 📝 Contributing
1. Create a feature branch
2. Write tests for new features
3. Update documentation
4. Submit pull request

## 🏷 Version Control
- Use semantic versioning
- Tag releases appropriately
- Keep change log updated

## 🔧 Troubleshooting

### Common Commands
```bash
# Check Playwright version
npx playwright --version

# Show browser paths
npx playwright install --help

# Clear reports
npm run clean:reports
```

### Debug Mode
```bash
# Run tests in debug mode
npm run test:debug

# Run with Playwright Inspector
PWDEBUG=1 npm test
```

## 📚 Additional Resources
- [Playwright Documentation](https://playwright.dev)
- [Allure Framework](https://docs.qameta.io/allure/)
- [Page Object Model Best Practices](https://playwright.dev/docs/pom)
