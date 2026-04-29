import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';

const ensureDir = (filePath: string) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export const parseNumber = (text: string): number => {
  if (!text) return 0;

  text = text.replace(/,/g, '').trim().toUpperCase();

  if (text.includes('K')) {
    return Math.round(parseFloat(text) * 1000);
  }

  if (text.includes('M')) {
    return Math.round(parseFloat(text) * 1000000);
  }

  return parseInt(text) || 0;
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
export const saveCSV = (data: any[], filePath: string) => {
  if (!data.length) return;

  ensureDir(filePath);

  const headers = Object.keys(data[0]).join(',');

  const rows = data
    .map(obj =>
      Object.values(obj)
        .map(val => `"${String(val).replace(/"/g, '""')}"`)
        .join(',')
    )
    .join(';\n');

  const csv = headers + '\n' + rows;

  fs.writeFileSync(filePath, csv, 'utf-8');
};