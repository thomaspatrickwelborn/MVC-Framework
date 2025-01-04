import Tests from "./tests/index.js"
import PandTreeView from '../classes/views/pand-tree/index.js'
import TestResultsModels from '../classes/models/test-results/index.js'

const testResultsModels = await TestResultsModels(Tests)
const testResults = new TestResultsView({
  parentElement: document.querySelector('index'),
  tests: testResultsModels,
})
testResults.render(testResults.models, 'default')
