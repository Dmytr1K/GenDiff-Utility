import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

export default (filepath) => {
  const content = fs.readFileSync(filepath, 'utf-8');
  const parseType = path.extname(filepath).substring(1);
  const parse = parsers[parseType];

  return parse(content);
};
