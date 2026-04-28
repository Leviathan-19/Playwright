import * as fs from 'fs';

const STATE_PATH = 'state.json';

export const hasSession = (): boolean => {
  return fs.existsSync(STATE_PATH);
};

export const getSessionPath = () => STATE_PATH;