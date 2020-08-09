import _ from 'lodash';

const parse = (value) => {
  if (_.isString(value)) return `'${value}'`;
  if (_.isObject(value)) return '[complex value]';
  return value;
};

const builders = {
  unchanged: () => [],
  removed: (property) => `Property '${property}' was removed`,
  added: (property, node) => `Property '${property}' was added with value: ${parse(node.value)}`,
  updated: (property, node) => `Property '${property}' was updated. From ${parse(node.valueBefore)} to ${parse(node.valueAfter)}`,
  nested: (property, node, getStrings) => getStrings(node.children, property),
};

const getStrings = (diff, path) => {
  const callback = (acc, node) => {
    const { name, type } = node;
    const property = path ? `${path}.${name}` : name;

    return _.flatten([...acc, builders[type](property, node, getStrings)]);
  };

  return diff.reduce(callback, []);
};

const format = (diffTree) => getStrings(diffTree).join('\n');

export default format;
