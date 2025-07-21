import { Page } from '@playwright/test';

export class PropertyPage {
  constructor(private page: Page) {}

  async openFirstProperty() {
    await this.page.getByRole('link', { name: /View details/i }).first().click();
  }
}
