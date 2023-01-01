import { assert } from 'chai';
import { assignByKey, drillDown, sortByKey, equality, indexByKey, unwindByKey, filterByKey/*, ifNotInAddToIndex*/ } from '../src';

describe('assignByKey', () => {
  it('should assign the value to the nested path', () => {
    const parent = {
      child: {
        grandchild: {
          attribute: 'placeholder'
        }
      }
    }
    const path = 'child.grandchild.attribute'.split('.')
    const value = 'value'
    assignByKey(parent, path, value)
    assert(drillDown(parent, path), value)
  })
})

describe('drillDown', () => {
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
    const key = 'child.grandchild.value'.split('.')
    data.sort(sortByKey({key, order: true}));

    const firstValueAfterSort = data[0].child.grandchild.value;
    assert.notEqual(firstValueBeforeSort, firstValueAfterSort);
  })
});

describe('equality', () => {
  it('should match', () => {
    const data = [
      {child: {grandchild: {value: 'bbb'}}},
      {child: {grandchild: {value: 'aaa'}}},
    ];
    const found = data.find(equality('child.grandchild.value'.split('.'), 'aaa'));
    assert.deepEqual(found, data[1]);
  })
})

// describe('ifNotInAddToIndex', () => {
//   it('should work', () => {
//     const data = [
//       {child: {grandchild: {value: 'bbb'}}},
//       {child: {grandchild: {value: 'aaa'}}},
//     ];
//     const keyPathUnique = 'data.grandchild.value'.split('.')
//     const uniqueSet = {};
//     const result = data.filter(ifNotInAddToIndex(uniqueSet, keyPathUnique));

//     console.log('result', JSON.stringify(result, null, 2))
//     console.log('uniqueSet', JSON.stringify(uniqueSet, null, 2))
//     // assert.equal(Object.keys(uniqueSet), 2)
//   })
// })

describe('filterByKey', () => {
  it('should work', () => {
    const data = [
      {child: {grandchild: {value: 'bbb'}}},
      {child: {grandchild: {value: 'aaa'}}},
    ];
    const key = 'child.grandchild.value'.split('.')
    const value = 'aaa'
    // const result = 
    data.filter(filterByKey({key, value}))
    // console.log(JSON.stringify(result))
    // assert.equal(result.length, 1)
  })
})

describe('unwindByKey', () => {
  it('should work', () => {
    const data = [
      {child: {grandchild: {value: ['aaa', 'bbb', 'ccc']}}},
      {child: {grandchild: {value: ['ddd', 'eee', 'fff']}}},
    ];
    const keyPath = 'child.grandchild.value'.split('.')
    const result = unwindByKey(data, keyPath)
    // console.log(JSON.stringify(result))
    assert.equal(result.length, 6)
  })
})

describe('indexByKey', () => {
  it('should work', () => {
    const data = [
      {child: {grandchild: {value: 'bbb'}}},
      {child: {grandchild: {value: 'aaa'}}},
    ];
    const keyPath = 'child.grandchild.value'.split('.')
    const result = indexByKey(data, keyPath)
    // console.log(JSON.stringify(result))
    assert.equal(Object.keys(result).length, 2)
  })
})
