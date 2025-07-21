import { Page } from '@playwright/test';

export class FormPage {
  constructor(private page: Page) {}

  async fillEmail(email: string) {
    await this.page.fill('input[type="email"]', email);
  }

  async submit() {
    await this.page.click('button[type="submit"]');
  }
}
