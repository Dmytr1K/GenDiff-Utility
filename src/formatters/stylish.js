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
const render = (data, depth, stringify) => {
  if (!_.isObject(data)) return data;
  const newDepth = depth + 1;
  const entries = Object.entries(data);
  const strings = entries
    .flatMap(([key, value]) => [stringify(key, render(value, newDepth, stringify), newDepth, 'blank')]);
  const framedStrigs = [frameChars.initial, ...strings, getIndent(newDepth) + frameChars.final];
  return framedStrigs.join('\n');
};
const stringify = (name, value, depth, type) => getIndent(depth) + getPrefix(type)
  + name + separator + filler + render(value, depth, stringify);

const format = (diffTree) => {
  const builders = {
    unchanged: (node, depth) => stringify(node.name, node.value, depth, 'blank'),
    removed: (node, depth) => stringify(node.name, node.value, depth, 'minus'),
    added: (node, depth) => stringify(node.name, node.value, depth, 'plus'),
    changed: (node, depth) => [
      stringify(node.name, node.valueBefore, depth, 'minus'),
      stringify(node.name, node.valueAfter, depth, 'plus'),
    ],
    nested: (node, depth, innerFormat) => stringify(
      node.name,
      innerFormat(node.children, depth + 1),
      depth,
      'blank',
    ),
  };

  const innerFormat = (innerDiffTree, depth) => {
    const strings = innerDiffTree.flatMap((node) => builders[node.type](node, depth, innerFormat));
    const framedStrigs = [frameChars.initial, ...strings, getIndent(depth) + frameChars.final];
    return framedStrigs.join('\n');
  };

  return innerFormat(diffTree, 0);
};

export default format;
