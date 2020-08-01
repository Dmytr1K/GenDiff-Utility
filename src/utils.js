import fs from 'fs';
import path from 'path';

export const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

export const getFileExtension = (filePath) => path.extname(filePath).substring(1);

export const convert = (data, type, converters) => converters[type](data);
