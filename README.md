# deepdown
Safely drill into your JavaScript objects with dynamically defined paths

[![Build Status](https://travis-ci.org/cyrfer/deepdown.svg?branch=master)](https://travis-ci.org/cyrfer/deepdown) [![dependencies Status](https://david-dm.org/cyrfer/deepdown/status.svg)](https://david-dm.org/cyrfer/deepdown) [![devDependencies Status](https://david-dm.org/cyrfer/deepdown/dev-status.svg)](https://david-dm.org/cyrfer/deepdown?type=dev) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# Install
`npm install --save deepdown`

# Example assignByKey

```javascript
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
console.log(drillDown(parent, path))
/* prints
value
*/
```

# Example drillDown

```javascript
const drillDown = require('deepdown').drillDown;

const appState = {
  nested: {
    dynamic: {
      data: true,
      error: false
    },
    static: {
      other: 'stuff'
    }
  }
};

const route = 'data';
const choice = true;
const path = ['nested', choice ? 'dynamic' : 'static'];
path.push(route);

// --- no crashes even if path is wrong
const result = drillDown(appState, path);

console.log('or be brave', drillDown(appState, `wrong.${!choice ? 'static' : null}.${route}`.split('.')));

// --- what you've been doing
// to avoid crashes involves tedious, statically defined checks
const safeResult = appState.nested && appState.nested.static && appState.nested.static.other;
```

# Example sortByKey

```javascript
const sortByKey = require('deepdown').sortByKey;
const data = [
  {child: {grandchild: {value: 'bbb'}}}, // 'bbb' is greater than 'aaa'
  {child: {grandchild: {value: 'aaa'}}},
];

const firstValueBeforeSort = data[0].child.grandchild.value;
console.log(firstValueBeforeSort)
/* prints
bbb
*/

// --- sort by a nested key --- //
const key = 'child.grandchild.value'.split('.')
data.sort(sortByKey({key, order: true}));

const firstValueAfterSort = data[0].child.grandchild.value;
console.log(firstValueAfterSort)
/* prints
aaa
*/
```

# Example equality

```javascript
const equality = require('deepdown').equality;

const data = [
  {child: {grandchild: {value: 'bbb'}}}, // 'bbb' is greater than 'aaa'
  {child: {grandchild: {value: 'aaa'}}},
];

const data = [
  {child: {grandchild: {value: 'bbb'}}},
  {child: {grandchild: {value: 'aaa'}}},
];
const found = data.find(equality('child.grandchild.value'.split('.'), 'aaa'));

console.log(found);
/* prints
{ child: { grandchild: { value: 'aaa' } } }
*/
```

# Example filterByKey

```javascript
const filterByKey = require('deepdown').filterByKey;

const data = [
  {child: {grandchild: {value: 'bbb'}}},
  {child: {grandchild: {value: 'aaa'}}},
];
const key = 'child.grandchild.value'.split('.')
const value = 'aaa' // only looking for matches with `aaa`
const result = data.filter(filterByKey({key, value}))
console.log(JSON.stringify(result))
/* prints
[{"child":{"grandchild":{"value":"aaa"}}}]
*/
```

# Example unwindByKey

```javascript
const unwindByKey = require('deepdown').unwindByKey;

const data = [
    {child: {grandchild: {value: ['aaa', 'bbb', 'ccc']}}},
    {child: {grandchild: {value: ['ddd', 'eee', 'fff']}}},
];
const keyPath = 'child.grandchild.value'.split('.')
const result = unwindByKey(data, keyPath)
console.log(JSON.stringify(result))
/* prints
[
  {"child":{"grandchild":{"value":"aaa"}}},
  {"child":{"grandchild":{"value":"bbb"}}},
  {"child":{"grandchild":{"value":"ccc"}}},
  {"child":{"grandchild":{"value":"ddd"}}},
  {"child":{"grandchild":{"value":"eee"}}},
  {"child":{"grandchild":{"value":"fff"}}}
]
*/
```

# Example indexByKey

```javascript
const indexByKey = require('deepdown').indexByKey;

const data = [
    {child: {grandchild: {value: 'bbb'}}},
    {child: {grandchild: {value: 'aaa'}}},
];
const keyPath = 'child.grandchild.value'.split('.')
const result = indexByKey(data, keyPath)
console.log(JSON.stringify(result))
/* prints
{
  "bbb":[{"child":{"grandchild":{"value":"bbb"}}}],
  "aaa":[{"child":{"grandchild":{"value":"aaa"}}}]
}
*/
```

# Commands
- `npm test` - Run tests with linting and coverage results.
- `npm run lint` - Run ESlint with airbnb-config
- `npm run build` - Babel will transpile ES6 => ES5 and minify the code.
- `npm run prepublish` - Hook for npm. Do all the checks before publishing your module.
