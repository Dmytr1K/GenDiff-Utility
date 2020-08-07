import _ from 'lodash';

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

const getString = (type, depth, name, value) => {
  const indent = getIndent(depth, type);
  return `${indent}${name}: ${stringify(value, depth + 1)}`;
};

const getFormattedStrings = (handler, tree, depth) => tree.flatMap((node) => handler(node, depth));
const getJoinedString = (strings) => `\n${strings.join('\n')}\n`;

const format = (diffTree) => {
  const iter = (node, depth) => {
    const { name, type } = node;
    if (type === 'nested') {
      const { children } = node;
      const joinedString = getJoinedString(getFormattedStrings(iter, children, depth + 1));
      const indent = getIndent(depth);
      return `${indent}${name}: {${joinedString}${indent}}`;
    }
    if (type === 'updated') {
      const { valueBefore, valueAfter } = node;
      const stringBefore = getString('removed', depth, name, valueBefore);
      const stringAfter = getString('added', depth, name, valueAfter);
      return [stringBefore, stringAfter];
    }
    const { value } = node;
    return getString(type, depth, name, value);
  };

  const joinedResultString = getJoinedString(getFormattedStrings(iter, diffTree, 0));
  return `{${joinedResultString}}`;
};

export default format;
