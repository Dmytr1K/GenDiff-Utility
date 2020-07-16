import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import getDiff from './getDiff.js';

// eslint-disable-next-line consistent-return
const parse = (filepath) => {
  const format = path.extname(filepath);
  const content = fs.readFileSync(filepath, 'utf-8');

  if (format === '.json') {
    return JSON.parse(content);
  }
  if (format === '.yml') {
    return yaml.safeLoad(content);
  }
};

const genDiff = (filepath1, filepath2) => {
  const config1 = parse(filepath1);
  const config2 = parse(filepath2);

  return getDiff(config1, config2);
};

export default genDiff;
