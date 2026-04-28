import { Page } from 'playwright';

export const humanScroll = async (page: Page) => {
  for (let i = 0; i < 5; i++) {
    await page.mouse.wheel(0, 1000);
    await page.waitForTimeout(2000 + Math.random() * 3000);
  }
};
export const getPosts = async (page: Page) => {
  const posts = await page.locator('article a').all();

  return posts;
};