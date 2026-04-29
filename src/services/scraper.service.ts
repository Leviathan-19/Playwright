import { Page } from "playwright";
import { parseNumber } from "../utils/file";

export const humanScroll = async (page: Page) => {
  for (let i = 0; i < 5; i++) {
    await page.mouse.wheel(0, 1000);
    await page.waitForTimeout(2000 + Math.random() * 3000);
  }
};

export const getPosts = async (page: Page) => {
  console.log("Buscando posts...");

  await page.waitForSelector('a[href*="/p/"]', { timeout: 15000 });

  await page.mouse.wheel(0, 4000);
  await page.waitForTimeout(4000);

  const posts = await page.locator('a[href*="/p/"]').all();

  console.log(`Posts detectados: ${posts.length}`);

  return posts;
};

export const extractPostData = async (page: Page) => {
  await page.waitForTimeout(2000);

  let likes = 0;
  let comments = 0;
  let description = "";
  let date = "";

  try {
    const raw =
      (await page
        .locator('meta[property="og:description"]')
        .getAttribute("content")) || "";

    const regex =
      /([\d.,KkMm]+)\s+likes,\s+([\d.,KkMm]+)\s+comments\s+-\s+.*?:\s+"([\s\S]*)"/;

    const match = raw.match(regex);

    if (match && match[1] && match[2] && match[3]) {
      likes = parseNumber(match[1]);
      comments = parseNumber(match[2]);
      description = match[3].trim();
    }
  } catch {}

  try {
    const isoDate =
      (await page.locator("time").first().getAttribute("datetime")) || "";

    if (isoDate) {
      const d = new Date(isoDate);

      date = d.toLocaleString(); // formato legible
    }
  } catch {}

  return {
    likes,
    comments,
    description,
    date,
  };
};

export const scrapePosts = async (page: Page, limit: number = 10) => {
  console.log("Extrayendo links de posts...");

  const links = await page
    .locator('a[href*="/p/"]')
    .evaluateAll((elements) =>
      elements
        .map((el) => el.getAttribute("href"))
        .filter((href): href is string => !!href),
    );

  const uniqueLinks = [...new Set(links)].slice(0, limit);

  console.log(`Links únicos: ${uniqueLinks.length}`);

  const results = [];

  for (let i = 0; i < uniqueLinks.length; i++) {
    const link = uniqueLinks[i];
    const url = `https://www.instagram.com${link}`;

    console.log(`[${i + 1}/${uniqueLinks.length}] Abriendo: ${url}`);

    try {
      await page.goto(url, { waitUntil: "domcontentloaded" });

      await page.waitForSelector("time", { timeout: 10000 });

      await page.waitForTimeout(3000);

      const data = await extractPostData(page);

      console.log("Data extraída:", data);

      results.push(data);
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error en este post:", error.message);
      } else {
        console.log("Error desconocido:", error);
      }
    }

    await page.waitForTimeout(1500 + Math.random() * 2000);
  }

  console.log("Scraping finalizado");

  return results;
};
