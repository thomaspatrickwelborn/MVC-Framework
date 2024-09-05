import Hypothesis from './Hypothesis/index.js'
export default class Experiment extends EventTarget {
  #settings
  #options
  #_id
  #type = "experiment"
  #_title
  #_hypostheses
  constructor($settings = {}) {
    super()
  }
  get id() {
    if(this.#_id !== undefined) return this.#_id
    this.#_id = this.#settings.id
    return this.#_id
  }
  get title() {
    if(this.#_title !== undefined) return this.#_title
    this.#_title = this.#settings.title
    return this.#_title
  }
  get hypotheses() {
    if(this.#_hypotheses !== undefined) return this.#_hypotheses
    this.#_hypotheses = []
    let hypothesisIndex = 0
    for(const $hypothesis of this.#settings.hypotheses) {
      this.#_hypotheses.push(
        new Hypothesis(Object.assign($hypothesis, { id: hypothesisIndex }))
      )
      hypothesisIndex++
    }
    return this.#_hypotheses
  }
}