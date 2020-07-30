import stylish from './stylish.js';
import plain from './plain.js';
import convert from '../convert.js';

const json = JSON.stringify;

const formaters = {
  stylish,
  plain,
  json,
};

const format = (data, type) => convert(data, type, formaters);

export default format;
