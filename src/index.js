function drill(accum, key) {
  if (typeof accum === 'undefined' || accum === null) {
    return undefined;
  }

  return accum[key];
}

export const drillDown = (parent, descendents) => descendents.reduce(drill, parent);

export default drillDown;

export const assignByKey = (parent, path, value) => {
  const descendent = drillDown(parent, path.slice(0, -1));
  descendent[path.slice(-1)[0]] = value;
};

export const sortByKey = ({ key, order }) => (a, b) => {
  const da = drillDown(a, key);
  const db = drillDown(b, key);

  if (da < db) return order ? -1 : 1;
  if (da > db) return order ? 1 : -1;
  return 0;
};

export const equality = (key, val) => item => drillDown(item, key) === val;

// export const ifNotInAddToIndex = (index, itemKey) => (item) => {
//   const indexKey = drillDown(item, itemKey);
//   const wasInIndex = index[indexKey];

//   if (!wasInIndex) {
//     // eslint-disable-next-line no-param-reassign
//     index[indexKey] = item;
//   }

//   return !wasInIndex;
// };


// TODO: would shallow clone be good enough?
const clone = x => JSON.parse(JSON.stringify(x));

export const filterByKey = ({ key, value }) => (elem) => {
  const filterValue = drillDown(elem, key);
  return value === filterValue;
};

const unwindMap = (outerElem, writeKeyPath) => (innerElem) => {
  const dupElem = clone(outerElem);
  const parentKeyPath = writeKeyPath.slice(0, -1);
  const childKey = writeKeyPath.slice(-1)[0];
  const parent = (parentKeyPath.length > 0) ? drillDown(dupElem, parentKeyPath) : dupElem;
  parent[childKey] = innerElem;
  return dupElem;
};

export const unwindByKey = (arrayOld, keyPath) => arrayOld.reduce((accum, arrayOldElem) => {
  const uwt = drillDown(arrayOldElem, keyPath);
  const result = Array.isArray(uwt) ? uwt.map(unwindMap(arrayOldElem, keyPath)) : [uwt];
  return [
    ...accum,
    ...result
  ];
}, []);

export const indexByKey = (array, key) => array.reduce((accum, element) => {
  const keyValue = drillDown(element, key);
  if (!keyValue) {
    return accum;
  }
  if (!accum[keyValue]) {
    // eslint-disable-next-line no-param-reassign
    accum[keyValue] = [];
  }
  accum[keyValue].push(element);
  return accum;
}, {});
