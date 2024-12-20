import PandTreeView from '../pand-tree/index.js'
import TestResultsModels from '../../models/test-results/index.js'
export default class TestResultsView extends PandTreeView {
  constructor($settings) {
    super({
      get Class() { return TestResultsView },
      parentElement: $settings.parentElement,
      models: TestResultsModels($settings.tests),
    })
  }
}
