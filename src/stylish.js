import _ from 'lodash';

const getDiffType = (valuesPair) => {
  const [valueBefore, valueAfter] = valuesPair;
  if (valueBefore === undefined) {
    return 'added';
  }
  if (valueAfter === undefined) {
    return 'deleted';
  }
  if (valueBefore !== valueAfter) {
    return 'changed';
  }

  return 'unchanged';
};

const getIndent = (depth, diffType = 'unchanged') => {
  const filler = ' ';
  const indentSize = 4;
  const prefixIndentSize = 2;
  const prefixes = {
    unchanged: filler,
    added: '+',
    deleted: '-',
  };
  const prefix = prefixes[diffType];

  return filler.repeat(indentSize * depth + prefixIndentSize) + prefix + filler;
};

const stringify = (object, depth) => {
  if (!_.isObject(object)) return object;
  const [key, value] = Object.entries(object).flat();
  const openingIndent = getIndent(depth);
  const closingIndent = getIndent(depth - 1);

  return `{\n${openingIndent}${key}: ${value}\n${closingIndent}}`;
};

const getFullString = (diffType, depth, name, values) => {
  const [valueBefore, valueAfter] = values;
  const indent = getIndent(depth, diffType);
  const value = diffType === 'deleted' ? valueBefore : valueAfter;

  return `${indent}${name}: ${stringify(value, depth + 1)}`;
};

const format = (diff) => {
  const iter = (node, depth) => {
    const { name, objectsDifference, valuesPair } = node;

    if (objectsDifference) {
      const indent = getIndent(depth);

      return `${indent}${name}: {\n${_.sortBy(objectsDifference, ['name']).flatMap((item) => iter(item, depth + 1)).join('\n')}\n${indent}}`;
    }

    const diffType = getDiffType(valuesPair);
    if (diffType === 'changed') {
      const stringAfter = getFullString('added', depth, name, valuesPair);
      const stringBefore = getFullString('deleted', depth, name, valuesPair);

      return [stringBefore, stringAfter];
    }

    return getFullString(diffType, depth, name, valuesPair);
  };

  return `{\n${_.sortBy(diff, ['name']).flatMap((node) => iter(node, 0)).join('\n')}\n}`;
};

export default format;
