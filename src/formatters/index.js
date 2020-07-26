import stylish from './stylish.js';
import plain from './plain.js';

const formaters = {
  stylish,
  plain,
};

export default (diff, formatType) => {
  const format = formaters[formatType];

  return format(diff);
};
