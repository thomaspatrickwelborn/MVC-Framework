import PandTree from '../pand-tree/index.js'
import Model from './model.js'
export default class TestResults extends PandTree {
  constructor($settings) {
    super({
      parent: $settings.parent,
      model: Model($settings.model), 
    })
  }
}
