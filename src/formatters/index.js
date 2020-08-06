import stylish from './stylish.js';
import plain from './plain.js';

const json = JSON.stringify;

const formaters = {
  stylish,
  plain,
  json,
};

const format = (data, type) => formaters[type](data);

export default format;
