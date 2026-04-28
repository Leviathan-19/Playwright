import { firefox, BrowserContext } from 'playwright';
import { ENV } from '../config/env';
import { hasSession, getSessionPath } from './session';

export const launchBrowser = async (): Promise<BrowserContext> => {
  const browser = await firefox.launch({
    headless: ENV.HEADLESS
  });

  const contextOptions: any = {};

  if (hasSession()) {
    contextOptions.storageState = getSessionPath();
  }

  const context = await browser.newContext(contextOptions);

  return context;
};