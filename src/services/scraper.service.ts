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

export const extractPostData = async (page: Page) => {
  await page.waitForTimeout(4000);

  let likes = 0;
  let comments = 0;
  let description = '';
  let date = '';

  try {
    const likesText = await page.locator('section span').first().innerText();
    likes = parseInt(likesText.replace(/\D/g, '')) || 0;
  } catch {}

  try {
    description = await page.locator('article div div span').nth(0).innerText();
  } catch {}

  try {
    date = await page.locator('time').getAttribute('datetime') || '';
  } catch {}

  try {
    comments = await page.locator('ul ul').count();
  } catch {}

  return {
    likes,
    comments,
    description,
    date
  };
};
export const scrapePosts = async (page: Page, limit: number = 10) => {
  const posts = await page.locator('article a').all();

  const results = [];

  for (let i = 0; i < Math.min(limit, posts.length); i++) {
  const post = posts[i];

  if (!post) continue;

  await post.click();

  await page.waitForTimeout(5000);

  const data = await extractPostData(page);

  results.push(data);

  await page.keyboard.press('Escape');

  await page.waitForTimeout(5000 + Math.random() * 5000);
}

  return results;
};