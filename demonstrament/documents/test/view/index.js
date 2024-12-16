// import TestResults from "../classes/views/test-results/index.js"
// import Tests from "./tests/index.js"

// const testResults = new TestResults({
//   parent: document.querySelector('index'),
//   model: Tests,
// })
// testResults.render(testResults.model, 'default')
import { View } from '/dependencies/mvc-framework.js'
const view = new View({
  parent: document.querySelector('index'),
  templates: { default: () => `
    <div id="_1">
      <div id="_2"></div>
    </div>
  ` },
  querySelectors: { querySelector: {
    '_1': ':scope > #_1',
    '_2': ':scope > #_1 > #_2',
  } }
})
view.render()