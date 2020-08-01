import _ from 'lodash';

const getPropertyName = (names) => names.join('.');

const getParsedValue = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const format = (diffTree) => {
  const iter = (node, namesChain) => {
    const { name, type } = node;
    const propertyName = getPropertyName([...namesChain, name]);
    if (type === 'diffTree') {
      const { children } = node;
      return children.flatMap((child) => iter(child, [...namesChain, name]));
    }
    if (type === 'removed') {
      return `Property '${propertyName}' was removed`;
    }
    if (type === 'added') {
      const { value } = node;
      return `Property '${propertyName}' was added with value: ${getParsedValue(value)}`;
    }
    if (type === 'updated') {
      const { valueBefore, valueAfter } = node;
      return `Property '${propertyName}' was updated. From ${getParsedValue(valueBefore)} to ${getParsedValue(valueAfter)}`;
    }
    return '';
  };

  return diffTree.flatMap((node) => iter(node, [])).filter(String).join('\n');
};

export default format;
