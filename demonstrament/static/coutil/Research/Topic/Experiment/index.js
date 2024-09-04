import Hypothesis from './Hypothesis/index.js'
export default class Experiment extends EventTarget {
  #settings
  #options
  #_type = "experiment"
  constructor($settings = {}, $options = {}) {
    super()
  }
  get title() {
    if(this.#_title !== undefined) return this.#_title
    this.#_title = this.#settings.title
    return this.#_title
  }
  get hypotheses() {
    if(this.#_hypotheses !== undefined) return this.#_hypotheses
    this.#_hypotheses = []
    for(const $hypothesis of this.#settings.hypotheses) {
      new Hypothesis()
    }
    return this.#_hypotheses
  }
}