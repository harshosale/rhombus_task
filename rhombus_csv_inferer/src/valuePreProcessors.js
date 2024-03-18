export const valuePreProcessors = (val) => {
  let preProcessors = {
    object: "Text",
    "datetime64[ns]": "Date",
    float64: "Decimal - 64",
    int64: "Integer - 64",
  };
  return preProcessors[val] || val;
};
