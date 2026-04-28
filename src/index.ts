import { launchBrowser } from "./core/browser";
import { login } from "./services/auth.service";
import { saveSession } from "./core/session";
import { goToProfile } from "./services/instagram.service";
import { humanScroll, getPosts, scrapePosts } from "./services/scraper.service";
import { saveJSON, saveXLSX } from "./utils/file";

(async () => {
  const context = await launchBrowser();
  const page = await context.newPage();

  await page.goto("https://www.instagram.com/");

  let isLoggedIn = false;

  try {
    await page.waitForSelector("nav", { timeout: 5000 });
    isLoggedIn = true;
  } catch {
    isLoggedIn = false;
  }

  if (!isLoggedIn) {
    console.log("Login requerido...");

    await login(page);

    await page.waitForSelector("nav", { timeout: 120000 });

    await saveSession(context);
  } else {
    console.log("Sesión ya activa");
  }

  const targetUser = process.argv[2] || process.env.IG_TARGET_USER;

  if (!targetUser) {
    throw new Error("Debes proporcionar un usuario de Instagram en el .env");
  }
  const now = new Date();

  const formattedDate = now.toISOString().replace(/[:.]/g, "-");

  const basePath = `src/data/output/metadata_${targetUser}_${formattedDate}`;
  await goToProfile(page, targetUser);

  await humanScroll(page);

  const posts = await getPosts(page);

  console.log(`Posts encontrados: ${posts.length}`);

  const data = await scrapePosts(page, 10);

  console.log("Datos extraídos:", data);

  saveJSON(data, `${basePath}.json`);
  saveXLSX(data, `${basePath}.xlsx`);

  console.log("Datos exportados:", data);
})();
