import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildDiff from './buildDiff.js';
import format from './formatters/index.js';

const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');
const getFileExtension = (filePath) => path.extname(filePath).substring(1);

export default (filePathBefore, filePathAfter, outputFormatterType = 'stylish') => {
  const rawDataBefore = readFile(filePathBefore);
  const dataParserTypeBefore = getFileExtension(filePathBefore);
  const parsedDataBefore = parse(rawDataBefore, dataParserTypeBefore);

  const rawDataAfter = readFile(filePathAfter);
  const dataParserTypeAfter = getFileExtension(filePathAfter);
  const parsedDataAfter = parse(rawDataAfter, dataParserTypeAfter);

  const diffTree = buildDiff(parsedDataBefore, parsedDataAfter);

  return format(diffTree, outputFormatterType);
};
