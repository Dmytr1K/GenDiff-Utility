import _ from 'lodash';

const buildDiffTree = (dataBefore, dataAfter) => {
  const keysBefore = Object.keys(dataBefore);
  const keysAfter = Object.keys(dataAfter);
  const unsortedKeys = _.union(keysBefore, keysAfter);
  const sortedKeys = _.sortBy(unsortedKeys);

  const addEntry = (name) => {
    if (!_.has(dataBefore, name)) {
      return {
        name,
        type: 'added',
        value: dataAfter[name],
      };
    }
    if (!_.has(dataAfter, name)) {
      return {
        name,
        type: 'removed',
        value: dataBefore[name],
      };
    }
    if (_.isObject(dataBefore[name]) && _.isObject(dataAfter[name])) {
      return {
        name,
        type: 'nested',
        children: buildDiffTree(dataBefore[name], dataAfter[name]),
      };
    }
    if (dataBefore[name] === dataAfter[name]) {
      return {
        name,
        type: 'unchanged',
        value: dataAfter[name],
      };
    }
    return {
      name,
      type: 'updated',
      valueBefore: dataBefore[name],
      valueAfter: dataAfter[name],
    };
  };

  return sortedKeys.map(addEntry);
};

export default buildDiffTree;
