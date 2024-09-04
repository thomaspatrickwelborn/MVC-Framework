export default class HiddenAssumption extends EventTarget {
  #settings
  #options
  #_label
  #_premise
  constructor($settings = {}, $options = {}) {
    super()
  }
  get label() {
    if(this.#_label !== undefined) return this.#_label
    return this.#_label
  }
  get premise() {
    if(this.#_premise !== undefined) return this.#_premise
    return this.#_premise
  }
}