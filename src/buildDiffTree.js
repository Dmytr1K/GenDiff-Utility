import _ from 'lodash';

const buildDiffTree = (dataBefore, dataAfter) => {
  const keysBefore = Object.keys(dataBefore);
  const keysAfter = Object.keys(dataAfter);
  const unsortedKeys = _.union(keysBefore, keysAfter);
  const sortedKeys = _.sortBy(unsortedKeys);

  const addEntry = (key) => {
    if (!_.has(dataBefore, key)) {
      return {
        name: key,
        type: 'added',
        value: dataAfter[key],
      };
    }
    if (!_.has(dataAfter, key)) {
      return {
        name: key,
        type: 'removed',
        value: dataBefore[key],
      };
    }
    if (_.isObject(dataBefore[key]) && _.isObject(dataAfter[key])) {
      return {
        name: key,
        type: 'nested',
        children: buildDiffTree(dataBefore[key], dataAfter[key]),
      };
    }
    if (dataBefore[key] === dataAfter[key]) {
      return {
        name: key,
        type: 'unchanged',
        value: dataAfter[key],
      };
    }
    return {
      name: key,
      type: 'updated',
      valueBefore: dataBefore[key],
      valueAfter: dataAfter[key],
    };
  };

  return sortedKeys.map(addEntry);
};

export default buildDiffTree;
