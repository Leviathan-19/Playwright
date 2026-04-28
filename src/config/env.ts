import * as dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  IG_USER: process.env.IG_USER || '',
  IG_PASS: process.env.IG_PASS || '',
  IG_TARGET_USER: process.env.IG_TARGET_USER || '',
  HEADLESS: process.env.HEADLESS === 'true'
};