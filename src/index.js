import parse from './parsers.js';
import buildDiff from './buildDiff.js';
import format from './formatters/index.js';

export default (filepath1, filepath2, type = 'stylish') => {
  const dataBefore = parse(filepath1);
  const dataAfter = parse(filepath2);
  const diff = buildDiff(dataBefore, dataAfter);

  return format(diff, type);
};
