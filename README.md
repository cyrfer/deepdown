# deepdown
Safely drill into your JavaScript objects with dynamically defined paths

[![Build Status](https://travis-ci.org/cyrfer/deepdown.svg?branch=master)](https://travis-ci.org/cyrfer/deepdown) [![dependencies Status](https://david-dm.org/cyrfer/deepdown/status.svg)](https://david-dm.org/cyrfer/deepdown) [![devDependencies Status](https://david-dm.org/cyrfer/deepdown/dev-status.svg)](https://david-dm.org/cyrfer/deepdown?type=dev) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# Install
`npm install --save deepdown`

# Example 1

```
const drillDown = require('deepdown').default;

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

# Example 2

```
const data = [
  {child: {grandchild: {value: 'bbb'}}}, // 'bbb' is greater than 'aaa'
  {child: {grandchild: {value: 'aaa'}}},
];

const firstValueBeforeSort = data[0].child.grandchild.value;
console.log(firstValueBeforeSort)
> bbb

// --- sort by a nested key --- //
data.sort(sortByKey('child.grandchild.value'.split('.')));

const firstValueAfterSort = data[0].child.grandchild.value;
console.log(firstValueAfterSort)
> aaa
```

# Example 3

```
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
> { child: { grandchild: { value: 'aaa' } } }
```

# Commands
- `npm run clean` - Remove `lib/` directory
- `npm test` - Run tests with linting and coverage results.
- `npm test:only` - Run tests without linting or coverage.
- `npm test:watch` - You can even re-run tests on file changes!
- `npm test:prod` - Run tests with minified code.
- `npm run test:examples` - Test written examples on pure JS for better understanding module usage.
- `npm run lint` - Run ESlint with airbnb-config
- `npm run cover` - Get coverage report for your code.
- `npm run build` - Babel will transpile ES6 => ES5 and minify the code.
- `npm run prepublish` - Hook for npm. Do all the checks before publishing your module.
