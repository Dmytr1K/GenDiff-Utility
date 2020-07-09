import _ from 'lodash';

const getDiff = (config1, config2) => {
  const keys1 = Object.keys(config1);
  const keys2 = Object.keys(config2);

  const unionKeys = _.union(keys1, keys2);
  const intersectionKeys = _.intersection(keys1, keys2);
  const unchangedKeys = intersectionKeys
    .filter((key) => config1[key] === config2[key]);
  const changedKeys = _.difference(intersectionKeys, unchangedKeys);
  const newKeys = _.difference(keys2, keys1);
  const removedKeys = _.difference(keys1, keys2);

  const addData = (acc, key) => {
    if (unchangedKeys.includes(key)) {
      acc.push(`\n    ${key}: ${config2[key]}`);
    }
    if (removedKeys.includes(key)) {
      acc.push(`\n  - ${key}: ${config1[key]}`);
    }
    if (newKeys.includes(key)) {
      acc.push(`\n  + ${key}: ${config2[key]}`);
    }
    if (changedKeys.includes(key)) {
      acc.push(`\n  + ${key}: ${config2[key]}\n  - ${key}: ${config1[key]}`);
    }
    return acc;
  };

  const result = unionKeys.reduce(addData, []);
  const formatResult = `{${result.join('')}\n}`;

  return formatResult;
};

export default getDiff;
