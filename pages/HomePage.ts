import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://waitly.eu');
  }

  async clickMenu(menuName: string) {
    await this.page.getByRole('link', { name: menuName }).click();
  }
}
