const stringify = (value) => {
  const converters = new Map()
    .set('object', () => '[complex value]')
    .set('string', (data) => `'${data}'`)
    .set('default', (data) => data);
  const valueType = typeof value;
  const converterType = converters.has(valueType) ? valueType : 'default';
  const convert = converters.get(converterType);

  return convert(value);
};

const format = (diffTree) => {
  const builders = new Map()
    .set('unchanged', () => [])
    .set('removed', (property) => `Property '${property}' was removed`)
    .set('added', (property, node) => `Property '${property}' was added with value: ${stringify(node.value)}`)
    .set('changed', (property, node) => `Property '${property}' was updated. From ${stringify(node.valueBefore)} to ${stringify(node.valueAfter)}`)
    .set('nested', (property, node, innerFormat) => innerFormat(node.children, property));

  const innerFormat = (diff, path) => {
    const callback = (node) => {
      const { name, type } = node;
      const property = path ? `${path}.${name}` : name;

      return builders.get(type)(property, node, innerFormat);
    };

    return diff.flatMap(callback).join('\n');
  };

  return innerFormat(diffTree, '');
};

export default format;
