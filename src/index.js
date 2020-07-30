import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildDiff from './buildDiff.js';
import format from './formatters/index.js';

const readData = (filepath) => fs.readFileSync(filepath, 'utf-8');
const getParserType = (filepath) => path.extname(filepath).substring(1);

export default (filepath1, filepath2, type = 'stylish') => {
  const rawDataBefore = readData(filepath1);
  const parserTypeBefore = getParserType(filepath1);
  const dataBefore = parse(rawDataBefore, parserTypeBefore);

  const rawDataAfter = readData(filepath2);
  const parserTypeAfter = getParserType(filepath2);
  const dataAfter = parse(rawDataAfter, parserTypeAfter);

  const diff = buildDiff(dataBefore, dataAfter);

  return format(diff, type);
};
