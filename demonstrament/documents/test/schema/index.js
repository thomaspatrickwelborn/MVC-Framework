import TestResults from "../classes/views/test-results/index.js"
import Tests from "./tests/index.js"

const testResults = new TestResults({
  parent: document.querySelector('index'),
  model: Tests,
})
testResults.render(testResults.model, 'default')
