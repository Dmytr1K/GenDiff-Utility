import parse from './parsers.js';
import getDiff from './getDiff.js';

const genDiff = (filepath1, filepath2) => {
  const config1 = parse(filepath1);
  const config2 = parse(filepath2);

  return getDiff(config1, config2);
};

export default genDiff;
