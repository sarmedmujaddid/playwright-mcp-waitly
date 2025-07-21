import { Page } from '@playwright/test';

export class LocalizationPage {
  constructor(private page: Page) {}

  async switchLanguage(language: string) {
    await this.page.click(`button:has-text("${language}")`);
  }
}
