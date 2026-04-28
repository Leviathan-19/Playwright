import { launchBrowser } from './core/browser';
import { hasSession } from './core/session';
import { login } from './services/auth.service';
import { saveSession } from './core/session';

(async () => {
  const context = await launchBrowser();
  const page = await context.newPage();

  await page.goto('https://www.instagram.com/');

  const isLoggedIn = await page.locator('svg[aria-label="Home"]').count();

  if (!isLoggedIn) {
    console.log('No hay sesión activa, iniciando login...');
    await login(page);

    await saveSession(context);
  } else {
    console.log('Sesión ya activa');
  }

  await page.waitForTimeout(10000);
})();