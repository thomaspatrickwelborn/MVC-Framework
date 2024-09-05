export default class HiddenAssumption extends EventTarget {
  #settings
  #options
  #_id
  #_label
  #_premise
  constructor($settings = {}) {
    super()
  }
  get id() {
    if(this.#_id !== undefined) return this.#_id
    this.#_id = this.#settings.id
    return this.#_id
  }
  get label() {
    if(this.#_label !== undefined) return this.#_label
    this.#_label = this.#settings.label
    return this.#_label
  }
  get premise() {
    if(this.#_premise !== undefined) return this.#_premise
    this.#_premise = this.#settings.premise
    return this.#_premise
  }
}