import * as fs from 'fs';

const STATE_PATH = 'state.json';

export const hasSession = (): boolean => {
  return fs.existsSync(STATE_PATH);
};

export const getSessionPath = () => STATE_PATH;

export const saveSession = async (context: any) => {
  await context.storageState({ path: STATE_PATH });
  console.log('Sesión guardada en state.json');
};