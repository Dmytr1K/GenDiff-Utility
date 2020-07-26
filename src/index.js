import parse from './parsers.js';
import buildDiff from './buildDiff.js';
import stylish from './stylish.js';
import plain from './plain.js';

const formaters = {
  stylish,
  plain,
};

export default (filepath1, filepath2, formatType = 'stylish') => {
  const contentBefore = parse(filepath1);
  const contentAfter = parse(filepath2);
  const format = formaters[formatType];
  const diff = buildDiff(contentBefore, contentAfter);

  return format(diff);
};
