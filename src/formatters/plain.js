import _ from 'lodash';
import { getDiffType } from '../utils.js';

const getFullName = (path, name) => `${path ? `${path}.` : ''}${name}`;

const getParsedValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const format = (diff) => {
  const iter = (node, path) => {
    const { name, objectsDifference, valuesPair } = node;
    const fullName = getFullName(path, name);

    if (objectsDifference) {
      return objectsDifference.flatMap((item) => iter(item, fullName));
    }

    const [valueBefore, valueAfter] = valuesPair;

    const diffType = getDiffType(valuesPair);
    if (diffType === 'changed') {
      return `Property '${fullName}' was updated. From ${getParsedValue(valueBefore)} to ${getParsedValue(valueAfter)}`;
    }
    if (diffType === 'added') {
      return `Property '${fullName}' was added with value: ${getParsedValue(valueAfter)}`;
    }
    if (diffType === 'deleted') {
      return `Property '${fullName}' was removed`;
    }
    return '';
  };

  return diff.flatMap((node) => iter(node, '')).filter(String).join('\n');
};

export default format;
