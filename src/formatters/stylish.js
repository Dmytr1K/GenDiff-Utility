import _ from 'lodash';

const indentSize = 4;
const prefixIndentSize = 2;
const filler = ' ';
const separator = ':';
const frameChars = {
  initial: '{',
  final: '}',
};
const prefixChars = {
  blank: ' ',
  plus: '+',
  minus: '-',
};

const getIndent = (depth) => filler.repeat(indentSize * depth);
const getPrefix = (type) => filler.repeat(prefixIndentSize) + prefixChars[type] + filler;
const stringify = (name, value, depth, type) => getIndent(depth) + getPrefix(type)
  + name + separator + filler + value;

const render = (data, depth) => {
  if (!_.isObject(data)) return data;
  const newDepth = depth + 1;
  const entries = Object.entries(data);
  const strings = entries.flatMap(([key, value]) => [stringify(key, render(value, newDepth), newDepth, 'blank')]);
  const framedStrigs = [frameChars.initial, ...strings, getIndent(newDepth) + frameChars.final];
  return framedStrigs.join('\n');
};

const builders = {
  unchanged: (node, depth) => {
    const value = render(node.value, depth);
    return stringify(node.name, value, depth, 'blank');
  },
  removed: (node, depth) => {
    const value = render(node.value, depth);
    return stringify(node.name, value, depth, 'minus');
  },
  added: (node, depth) => {
    const value = render(node.value, depth);
    return stringify(node.name, value, depth, 'plus');
  },
  changed: (node, depth) => {
    const valueBefore = render(node.valueBefore, depth);
    const valueAfter = render(node.valueAfter, depth);
    return [
      stringify(node.name, valueBefore, depth, 'minus'),
      stringify(node.name, valueAfter, depth, 'plus'),
    ];
  },
  nested: (node, depth, format) => stringify(node.name, format(node.children, depth + 1), depth, 'blank'),
};

const format = (diffTree, depth = 0) => {
  const strings = diffTree.flatMap((node) => builders[node.type](node, depth, format));
  const framedStrigs = [frameChars.initial, ...strings, getIndent(depth) + frameChars.final];
  return framedStrigs.join('\n');
};

export default format;
