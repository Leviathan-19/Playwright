import { Page } from 'playwright';

export const goToProfile = async (page: Page, username: string) => {
  await page.goto(`https://www.instagram.com/${username}/`);

  await page.waitForTimeout(5000);
};