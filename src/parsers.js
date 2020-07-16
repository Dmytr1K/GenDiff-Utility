import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

// eslint-disable-next-line consistent-return
export default (filepath) => {
  const format = path.extname(filepath);
  const content = fs.readFileSync(filepath, 'utf-8');

  if (format === '.json') {
    return JSON.parse(content);
  }
  if (format === '.yml') {
    return yaml.safeLoad(content);
  }
};
