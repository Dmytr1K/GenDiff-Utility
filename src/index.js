import parse from './parsers.js';
import buildDiff from './buildDiff.js';
import format from './formatters/index.js';
import { readFile, getFileExtension } from './utils.js';

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
