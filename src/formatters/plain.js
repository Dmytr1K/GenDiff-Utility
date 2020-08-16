const parse = (value) => {
  const parsers = {
    boolean: (boolean) => boolean,
    number: (number) => number,
    string: (string) => `'${string}'`,
    object: () => '[complex value]',
  };

  return parsers[typeof value](value);
};

const builders = {
  unchanged: () => [],
  removed: (property) => `Property '${property}' was removed`,
  added: (property, node) => `Property '${property}' was added with value: ${parse(node.value)}`,
  changed: (property, node) => `Property '${property}' was updated. From ${parse(node.valueBefore)} to ${parse(node.valueAfter)}`,
  nested: (property, node, innerFormat) => innerFormat(node.children, property),
};

const format = (diffTree) => {
  const innerFormat = (diff, path) => {
    const callback = (node) => {
      const { name, type } = node;
      const property = path ? `${path}.${name}` : name;

      return builders[type](property, node, innerFormat);
    };

    return diff.flatMap(callback).join('\n');
  };

  return innerFormat(diffTree, '');
};

export default format;
