import Model from './model.js'
import View from './view.js'
export default class TestResults extends EventTarget {
  model
  view
  constructor($settings) {
    super()
    this.model = Model($settings.model)
    this.view = View({})
  }
  render() {
    this.view.render(this.model)
  }
}