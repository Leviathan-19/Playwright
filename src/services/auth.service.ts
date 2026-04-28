import { Page } from 'playwright';
import { ENV } from '../config/env';

export const login = async (page: Page) => {
  await page.goto('https://www.instagram.com/accounts/login/');

  await page.fill('input[name="username"]', ENV.IG_USER);
  await page.fill('input[name="password"]', ENV.IG_PASS);

  await page.click('button[type="submit"]');

};