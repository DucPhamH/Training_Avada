function fieldsQuery(fields, arrayData) {
  const newData = [];
  if (fields) {
    const fieldsArray = fields.split(",");
    const res = arrayData.map((data) => {
      const newRes = {};
      fieldsArray.forEach((field) => {
        newRes[field] = data[field];
      });
      return newRes;
    });
    newData.push(res);
    return newData;
  }
  return newData;
}

module.exports = {
  fieldsQuery,
};
