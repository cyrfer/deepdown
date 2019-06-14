import { assert } from 'chai';
import { drillDown, sortByKey } from '../src';


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

describe('sortByKey', () => {
  it('should sort', () => {
    const data = [
      {child: {grandchild: {value: 'bbb'}}}, // 'bbb' is greater than 'aaa'
      {child: {grandchild: {value: 'aaa'}}},
    ];

    const firstValueBeforeSort = data[0].child.grandchild.value;
    data.sort(sortByKey('child.grandchild.value'.split('.')));

    const firstValueAfterSort = data[0].child.grandchild.value;
    assert.notEqual(firstValueBeforeSort, firstValueAfterSort);
  })
})