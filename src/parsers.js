import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};

export default (filepath) => {
  const content = fs.readFileSync(filepath, 'utf-8');
  const format = path.extname(filepath);
  const parse = parsers[format];

  return parse(content);
};
