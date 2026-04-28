import { Page } from 'playwright';

export const goToProfile = async (page: Page, user: string) => {
  await page.goto(`https://www.instagram.com/${user}/`);
};