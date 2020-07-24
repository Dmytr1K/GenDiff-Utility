import parse from './parsers.js';
import getDiff from './getDiff.js';
import stylish from './stylish.js';

const formaters = {
  stylish,
};

const genDiff = (filepath1, filepath2, formatType = 'stylish') => {
  const config1 = parse(filepath1);
  const config2 = parse(filepath2);
  const format = formaters[formatType];
  const diff = getDiff(config1, config2);
  return format(diff);
};

export default genDiff;
