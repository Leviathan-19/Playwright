import { Page } from 'playwright';
import { ENV } from '../config/env';
import * as readline from 'readline';

const askCode = (): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question('Ingresa el código de verificación: ', answer => {
      rl.close();
      resolve(answer);
    });
  });
};

export const login = async (page: Page) => {
  await page.goto('https://www.instagram.com/accounts/login/');

  await page.waitForTimeout(3000);

  await page.fill('input[name="username"]', ENV.IG_USER);

  await page.fill('input[name="password"]', ENV.IG_PASS);

  await page.click('button[type="submit"]');

  await page.waitForTimeout(5000);

  const codeInput = await page.$('input[name="verificationCode"]');

  if (codeInput) {
    console.log('Se requiere código de verificación');

    const code = await askCode();

    await page.fill('input[name="verificationCode"]', code);
    await page.click('button[type="button"]');

    await page.waitForTimeout(5000);
  }

  try {
    await page.click('text=Not Now', { timeout: 5000 });
  } catch {}

  try {
    await page.click('text=Ahora no', { timeout: 5000 });
  } catch {}

  console.log('Login completado');
};