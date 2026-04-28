import { firefox, BrowserContext } from 'playwright';
import { ENV } from '../config/env';

export const launchBrowser = async (): Promise<BrowserContext> => {
  const browser = await firefox.launch({
    headless: ENV.HEADLESS
  });

  const context = await browser.newContext();

  return context;
};