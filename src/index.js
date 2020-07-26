import parse from './parsers.js';
import buildDiff from './buildDiff.js';
import format from './formatters/index.js';

export default (filepath1, filepath2, formatType = 'stylish') => {
  const contentBefore = parse(filepath1);
  const contentAfter = parse(filepath2);
  const diff = buildDiff(contentBefore, contentAfter);

  return format(diff, formatType);
};
