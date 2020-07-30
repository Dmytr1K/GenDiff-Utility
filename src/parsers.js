import yaml from 'js-yaml';
import ini from 'ini';
import convert from './convert.js';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

const parse = (data, type) => convert(data, type, parsers);

export default parse;
