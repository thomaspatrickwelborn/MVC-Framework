export default class Validation extends EventTarget {
  #_properties
  #_valid
  constructor() {
    super(...arguments)
  }
  get type() { return this.settings.type }
  get context() { return this.settings.context }
  get value() { return this.settings.value }
  get properties() {
    if(this.#_properties !== undefined) return this.#_properties
    this.#_properties = this.settings.properties
    return this.#_properties
  }
  get valid() { return this.#_valid }
  set valid($valid) {
    if(this.#_valid === undefined) {
      this.#_valid = $valid
    }
  }
}