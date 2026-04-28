import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';

const ensureDir = (filePath: string) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export const saveJSON = (data: any, filePath: string) => {
  ensureDir(filePath);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

export const saveXLSX = (data: any[], filePath: string) => {
  ensureDir(filePath);

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, ws, 'Posts');

  XLSX.writeFile(wb, filePath);
};