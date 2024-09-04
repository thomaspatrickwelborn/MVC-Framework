import Experiment from './Experiment/index.js'
export default class Topic extends EventTarget {
  #settings
  #options
  #_type = "topic"
  #_experiments
  constructor($settings = {}, $options = {}) {
    super()
  }
  get title() {
    if(this.#_title !== undefined) return this.#_title
    this.#_title = this.#settings.title
    return this.#_title
  }
  get experiments() {
    if(this.#_experiments !== undefined) return this.#_experiments
    this.#_experiments = []
    for(const $experiment of this.#settings.experiments) {
      new Experiment
    }
    return this.#_experiments
  }
}