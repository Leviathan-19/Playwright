import { launchBrowser } from './core/browser';
import { login } from './services/auth.service';
import { saveSession } from './core/session';
import { goToProfile } from './services/instagram.service';
import { humanScroll, getPosts } from './services/scraper.service';

(async () => {
  const context = await launchBrowser();
  const page = await context.newPage();

  await page.goto('https://www.instagram.com/');

  const isLoggedIn = await page.locator('nav').count();

  if (!isLoggedIn) {
    console.log('Login requerido...');
    await login(page);
    await saveSession(context);
  }

  const targetUser = process.argv[2] || process.env.IG_TARGET_USER;

  if (!targetUser) {
  throw new Error('Debes proporcionar un usuario de Instagram');
  }

  await goToProfile(page, targetUser);
  await humanScroll(page);

  const posts = await getPosts(page);

  console.log(`Posts encontrados: ${posts.length}`);

})();