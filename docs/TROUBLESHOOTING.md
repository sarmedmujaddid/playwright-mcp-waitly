# Troubleshooting Guide

## Common Issues and Solutions

### 1. Test Stability Issues

#### 1.1 Flaky Tests
**Symptom**: Tests pass sometimes and fail other times
**Solutions**:
- Use `safeFill` and `safeClick` methods
- Add appropriate waits
- Check for dynamic elements
- Verify selector stability
```typescript
// Instead of
await page.click('.button');

// Use
await page.waitForSelector('.button');
await page.click('.button');
```

#### 1.2 Timeout Issues
**Symptom**: Tests fail with timeout errors
**Solutions**:
- Increase timeout in configuration
- Add explicit waits
- Check network conditions
- Verify element presence
```typescript
test.setTimeout(120000); // Increase timeout for slow tests
```

### 2. Visual Testing Issues

#### 2.1 False Positives
**Symptom**: Visual tests fail for acceptable differences
**Solutions**:
- Adjust threshold values
- Use masking for dynamic content
- Update baselines if needed
```typescript
await visual.compareElement(element, 'component', {
    threshold: 0.2, // Increase threshold for dynamic components
});
```

#### 2.2 Screenshot Inconsistencies
**Symptom**: Screenshots differ across environments
**Solutions**:
- Use consistent viewport sizes
- Handle dynamic content
- Set consistent browser configurations
```typescript
await page.setViewportSize({ width: 1920, height: 1080 });
```

### 3. Cross-Browser Issues

#### 3.1 Browser-Specific Failures
**Symptom**: Tests fail in specific browsers
**Solutions**:
- Check feature support
- Use browser-specific code paths
- Implement polyfills if needed
```typescript
if (browserName === 'webkit') {
    // Safari-specific handling
}
```

#### 3.2 Mobile Issues
**Symptom**: Tests fail on mobile devices
**Solutions**:
- Test responsive design
- Handle touch events
- Check mobile-specific features
```typescript
await page.setViewportSize({ width: 375, height: 667 });
```

### 4. Data Management Issues

#### 4.1 Test Data Conflicts
**Symptom**: Tests interfere with each other's data
**Solutions**:
- Use unique test data
- Clean up after tests
- Isolate test environments
```typescript
await testData.generateUniqueData();
```

#### 4.2 Environment Issues
**Symptom**: Tests fail in different environments
**Solutions**:
- Use environment variables
- Configure per environment
- Handle environment-specific logic
```typescript
const baseUrl = process.env.TEST_ENV === 'prod' 
    ? 'https://waitly.eu' 
    : 'https://staging.waitly.eu';
```

### 5. Performance Issues

#### 5.1 Slow Tests
**Symptom**: Tests take too long to execute
**Solutions**:
- Run tests in parallel
- Optimize waits
- Reduce unnecessary actions
```typescript
await test.step('Optimize performance', async () => {
    // Combine multiple checks
    await Promise.all([
        page.waitForSelector('.element1'),
        page.waitForSelector('.element2')
    ]);
});
```

#### 5.2 Resource Issues
**Symptom**: Tests consume too many resources
**Solutions**:
- Close unused contexts
- Clean up resources
- Optimize browser instances
```typescript
await context.close();
```

### 6. Reporting Issues

#### 6.1 Missing Information
**Symptom**: Test reports lack necessary details
**Solutions**:
- Add more test steps
- Include screenshots
- Log relevant information
```typescript
await allure.step('Important action', async () => {
    await allure.attachScreenshot('Before action');
    // Test steps
    await allure.attachScreenshot('After action');
});
```

#### 6.2 Report Generation Failures
**Symptom**: Reports fail to generate
**Solutions**:
- Check file permissions
- Verify report paths
- Handle concurrent report generation
```typescript
await allure.generateReport({
    clean: true,
    override: true
});
```

### 7. CI/CD Issues

#### 7.1 Pipeline Failures
**Symptom**: Tests pass locally but fail in CI
**Solutions**:
- Check CI environment
- Set appropriate timeouts
- Handle CI-specific configurations
```typescript
if (process.env.CI) {
    test.setTimeout(120000);
}
```

#### 7.2 Resource Constraints
**Symptom**: Tests fail due to resource limits
**Solutions**:
- Optimize resource usage
- Configure CI resources
- Handle cleanup properly
```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    container:
      memory: 4G
      options: --shm-size=1g
```

## Quick Reference

### Useful Commands
```bash
# Clean test artifacts
npm run clean

# Update visual baselines
npm run test:visual:update

# Generate fresh report
npm run report:clean && npm run report:generate
```

### Debug Tools
```bash
# Run with debug logging
DEBUG=pw:api npm test

# Show browser
PWDEBUG=1 npm test

# Save trace
npm test --trace on
```

### Common Checks
```typescript
// Check element state
await expect(element).toBeVisible();
await expect(element).toBeEnabled();

// Check content
await expect(element).toContainText('Expected text');

// Check attributes
await expect(element).toHaveAttribute('class', 'expected-class');
```
