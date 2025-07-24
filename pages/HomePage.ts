import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://waitly.eu');
    await this.declineCookies();
  }

  async clickMenu(menuName: string) {
    await this.page.getByRole('link', { name: menuName }).click();
  }

  async declineCookies() {
    const denyButton = this.page.getByRole('button', { name: 'Deny' });
    if (await denyButton.isVisible()) {
      await denyButton.click();
    }
  }
}
