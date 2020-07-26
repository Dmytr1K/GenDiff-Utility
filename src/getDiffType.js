const getDiffType = (valuesPair) => {
  const [valueBefore, valueAfter] = valuesPair;
  if (valueBefore === undefined) {
    return 'added';
  }
  if (valueAfter === undefined) {
    return 'deleted';
  }
  if (valueBefore !== valueAfter) {
    return 'changed';
  }
  return 'unchanged';
};

export default getDiffType;
