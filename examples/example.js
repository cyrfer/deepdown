/* eslint-disable no-console */
const drillDown = require('../lib').default;

const route = 'data';
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

const path = ['nested', 'dynamic', route];
const defaultVal = drillDown(appState, path);
console.log(`found nested value <${defaultVal}>, from path [${path}], in object: ${JSON.stringify(appState)}`);
