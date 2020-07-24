import _ from 'lodash';

const buildDiff = (contentBefore, contentAfter) => {
  const keys = _.union(Object.keys(contentBefore), Object.keys(contentAfter));

  const addEntry = (key) => {
    const valueBefore = contentBefore[key];
    const valueAfter = contentAfter[key];
    const entry = { name: key };
    if (_.isObject(valueBefore) && _.isObject(valueAfter)) {
      entry.objectsDifference = buildDiff(valueBefore, valueAfter);
    } else {
      entry.valuesPair = [valueBefore, valueAfter];
    }
    return entry;
  };

  return keys.map(addEntry);
};

export default buildDiff;
