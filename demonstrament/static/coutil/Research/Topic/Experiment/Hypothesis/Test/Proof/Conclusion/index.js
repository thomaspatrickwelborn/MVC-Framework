export default class Conclusion extends EventTarget {
  #settings
  #options
  #_label
  #_inferences
  #_hiddenAssumptions
  constructor($settings = {}, $options = {}) {
    super()
    this.#settings = $settings
    this.#options = $options
  }
  get label() {
    if(this.#_label !== undefined) return this.#_label
    return this.#_label
  }
  get inferences() {
    if(this.#_inferences !== undefined) return this.#_inferences
    return this.#_inferences
  }
  get hiddenAssumptions() {
    if(this.#_hiddenAssumptions !== undefined) return this.#_hiddenAssumptions
    return this.#_hiddenAssumptions
  }
}