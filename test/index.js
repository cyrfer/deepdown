import { assert } from 'chai';
import drillDown from '../src';

describe('drillDown.', () => {
  it('should return parent when path is empty', () => {
    const parent = {}
    const expectedVal = parent
    assert(drillDown(parent, []) === expectedVal);
  });

  it('should return undefined when path does not exist', () => {
    const parent = {}
    const expectedVal = undefined
    assert(drillDown(parent, ['missing']) === expectedVal);
  });

  it('should return nested value when path does exist', () => {
    const value = true
    const parent = {exists: true}
    const expectedVal = value
    assert(drillDown(parent, ['exists']) === expectedVal);
  });
});
