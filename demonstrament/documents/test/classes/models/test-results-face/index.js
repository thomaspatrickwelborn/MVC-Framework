import Model from '../../core/model/index.js'
export default class TestResultsFace extends Model {
  #_collect = new Map()
  constructor($settings) {
    super($settings)
  }
  get collect() { return this.#_collect }
}