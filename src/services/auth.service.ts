import { Page } from 'playwright';

export const login = async (page: Page) => {
  console.log('🔐 Inicia sesión manualmente en Instagram...');

  await page.goto('https://www.instagram.com/');

  await page.waitForSelector('nav', { timeout: 120000 });

  console.log('Login detectado');
};