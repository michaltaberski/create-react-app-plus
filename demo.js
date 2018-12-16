/* eslint-disable */

// IMO YES
const findByIdOrObject = (idOrMatchProps, searchArray) => {
  if (typeof idOrMatchProps === 'string') {
    return searchArray.find(entity => entity.id === idOrMatchProps) || null;
  }
  return _.findWhere(searchArray, idOrMatchProps) || null;
};

// IMO NO
const findByIdOrObject = (idOrMatchProps, searchArray) => {
  let result = null;
  if (typeof idOrMatchProps === 'string') {
    result = searchArray.find(entity => entity.id === idOrMatchProps) || null;
  }
  return result !== null
    ? _.findWhere(searchArray, idOrMatchProps) || null
    : result;
};
