import _ from 'lodash';

const buildDiff = (dataBefore, dataAfter) => {
  const keys = _.union(Object.keys(dataBefore), Object.keys(dataAfter));

  const addEntry = (key) => {
    const valueBefore = dataBefore[key];
    const valueAfter = dataAfter[key];
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
