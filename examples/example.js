/* eslint-disable no-console */
const drillDown = require('../lib').default;

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
const path = ['nested', choice ? 'dynamic' : 'static', route];
const result = drillDown(appState, path);
console.log(`found nested value <${result}>, from path [${path}], in object: ${JSON.stringify(appState)}`);
console.log('or be brave', drillDown(appState, `wrong.${!choice ? 'static' : null}.${route}`.split('.')));
