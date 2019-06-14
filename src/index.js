function drill(accum, key) {
  if (typeof accum === 'undefined' || accum === null) {
    return undefined;
  }

  return accum[key];
}

const drillDown = (parent, descendents) => descendents.reduce(drill, parent);

export default drillDown;

const sortByKey = key => (a, b) => {
  const da = drillDown(a, key);
  const db = drillDown(b, key);

  if (da < db) return -1;
  if (da > db) return 1;
  return 0;
};

export { drillDown, sortByKey };
