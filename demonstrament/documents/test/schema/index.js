import Tests from "./tests/index.js"
import TestResultsView from "../classes/views/test-results/index.js"

const testResults = new TestResultsView({
  parentElement: document.querySelector('index'),
  tests: Tests,
})
testResults.render(testResults.models, 'default')
