import Experiment from './Experiment/index.js'
export default class Topic extends EventTarget {
  #settings
  #_id
  #type = "topic"
  #_title
  #_experiments
  constructor($settings = {}) {
    super()
    this.#settings = $settings
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
  get experiments() {
    if(this.#_experiments !== undefined) return this.#_experiments
    this.#_experiments = []
    let experimentIndex = 0
    for(const $experiment of this.#settings.experiments) {
      this.#_experiments.push(
        new Experiment(
          Object.assign($experiment, { id: experimentIndex })
        )
      )
      experimentIndex++
    }
    return this.#_experiments
  }
}