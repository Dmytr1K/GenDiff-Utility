import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildDiffTree from './buildDiffTree.js';
import format from './formatters/index.js';

const getData = (filePath) => {
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const parserType = path.extname(filePath).substring(1);

  return parse(rawData, parserType);
};

export default (filePathBefore, filePathAfter, outputFormatterType = 'stylish') => {
  const dataBefore = getData(filePathBefore);
  const dataAfter = getData(filePathAfter);
  const diffTree = buildDiffTree(dataBefore, dataAfter);
  const formattedDiffTree = format(diffTree, outputFormatterType);

  return formattedDiffTree;
};
