import Tests from "./tests/index.js"
import PandTreeView from '../classes/views/pand-tree/index.js'
import TestResultsModels from '../classes/models/test-results/index.js'

const testResultsModels = await TestResultsModels(Tests)
const testResults = new PandTreeView({
  parentElement: document.querySelector('index'),
  models: testResultsModels,
})
testResults.render(testResults.models, 'default')
