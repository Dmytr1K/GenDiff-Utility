import stylish from './stylish.js';
import plain from './plain.js';

const json = JSON.stringify;

const formaters = {
  stylish,
  plain,
  json,
};

export default (diff, formatType) => {
  const format = formaters[formatType];

  return format(diff);
};
