import { Page } from '@playwright/test';

export class SearchPage {
  constructor(private page: Page) {}

  async search(query: string) {
    await this.page.fill('input[placeholder="Search"]', query);
    await this.page.keyboard.press('Enter');
  }
}
