function drill(accum, key) {
  if (typeof accum === 'undefined' || accum === null) {
    return undefined;
  }

  return accum[key];
}

const drillDown = (parent, descendents) => descendents.reduce(drill, parent);

export default drillDown;

export { drillDown };
