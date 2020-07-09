import fs from 'fs';
import getDiff from './getDiff.js';

const genDiff = (filepath1, filepath2) => {
  const config1 = JSON.parse(fs.readFileSync(filepath1));
  const config2 = JSON.parse(fs.readFileSync(filepath2));

  return getDiff(config1, config2);
};

export default genDiff;
