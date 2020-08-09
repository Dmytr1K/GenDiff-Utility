import _ from 'lodash';

const buildDiffTree = (dataBefore, dataAfter) => {
  const sortedKeys = _.sortBy(_.union(Object.keys(dataBefore), Object.keys(dataAfter)));

  const addEntry = (name) => {
    const valueBefore = dataBefore[name];
    const valueAfter = dataAfter[name];

    const getDiffType = () => {
      if (_.isObject(valueBefore) && _.isObject(valueAfter)) return 'nested';
      if (valueBefore === valueAfter) return 'unchanged';
      if (valueBefore === undefined) return 'added';
      if (valueAfter === undefined) return 'removed';
      return 'updated';
    };

    const getEntryParser = () => {
      const parsers = {
        unchanged: () => ({ name, type: 'unchanged', value: valueAfter }),
        added: () => ({ name, type: 'added', value: valueAfter }),
        removed: () => ({ name, type: 'removed', value: valueBefore }),
        nested: () => ({
          name,
          type: 'nested',
          children: buildDiffTree(valueBefore, valueAfter),
        }),
        updated: () => ({
          name,
          type: 'updated',
          valueBefore,
          valueAfter,
        }),
      };

      return parsers[getDiffType(valueBefore, valueAfter)];
    };

    const parseEntry = getEntryParser();
    return parseEntry();
  };

  return sortedKeys.map(addEntry);
};

export default buildDiffTree;
