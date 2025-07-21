import { Page } from '@playwright/test';

export class AccessibilityPage {
  constructor(private page: Page) {}

  async checkTabNavigation() {
    await this.page.keyboard.press('Tab');
  }
}
