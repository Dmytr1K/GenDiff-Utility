export default (data, type, converters) => {
  const convert = converters[type];

  return convert(data);
};
