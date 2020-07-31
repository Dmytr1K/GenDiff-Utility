import _ from 'lodash';
import { compareValues } from '../utils.js';

const getIndent = (depth, diffType = 'unchanged') => {
  const filler = ' ';
  const indentSize = 4;
  const prefixIndentSize = 2;
  const prefixes = {
    unchanged: filler,
    added: '+',
    removed: '-',
  };
  const prefix = prefixes[diffType];
  return filler.repeat(indentSize * depth + prefixIndentSize) + prefix + filler;
};

const stringify = (data, depth) => {
  if (!_.isObject(data)) return data;
  const openingIndent = getIndent(depth);
  const closingIndent = getIndent(depth - 1);
  const [key, value] = Object.entries(data).flat();
  return `{\n${openingIndent}${key}: ${value}\n${closingIndent}}`;
};

const getString = (diffType, depth, name, valuesPair) => {
  const indent = getIndent(depth, diffType);
  const [valueBefore, valueAfter] = valuesPair;
  const value = diffType === 'removed' ? valueBefore : valueAfter;
  return `${indent}${name}: ${stringify(value, depth + 1)}`;
};

const format = (diff) => {
  const iter = (node, depth) => {
    const { name, objectsDifference, valuesPair } = node;

    if (objectsDifference) {
      const indent = getIndent(depth);
      return `${indent}${name}: {\n${objectsDifference.flatMap((item) => iter(item, depth + 1)).join('\n')}\n${indent}}`;
    }

    const diffType = compareValues(valuesPair);
    if (diffType === 'updated') {
      const stringBefore = getString('removed', depth, name, valuesPair);
      const stringAfter = getString('added', depth, name, valuesPair);
      return [stringBefore, stringAfter];
    }

    return getString(diffType, depth, name, valuesPair);
  };

  return `{\n${diff.flatMap((node) => iter(node, 0)).join('\n')}\n}`;
};

export default format;
