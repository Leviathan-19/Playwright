import { Page } from 'playwright';

export const goToProfile = async (page: Page, username: string) => {
  await page.goto(`https://www.instagram.com/${username}/`);

  await page.waitForTimeout(5000);
};

export const validateProfile = async (page: Page) => {
  await page.waitForTimeout(5000);

  const isPrivate = await page.locator('text=This account is private').count();

  if (isPrivate > 0) {
    return { valid: false, reason: 'PRIVATE' };
  }
  const notFound = await page.locator('text=Sorry, this page').count();

  if (notFound > 0) {
    return { valid: false, reason: 'NOT_FOUND' };
  }

  const posts = await page.locator('article a').count();

  if (posts === 0) {
    return { valid: false, reason: 'NO_POSTS' };
  }

  return { valid: true };
};