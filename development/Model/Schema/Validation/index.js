const Messages = {
  'true': ($validation) => `${$validation.valid}`,
  'false': ($validation) => `${$validation.valid}`,
}
export default class Validation extends EventTarget {
  #settings
  #_properties
  #_valid
  #_advance = []
  #_deadvance = []
  #_unadvance = []
  constructor($settings = {}) {
    super()
    this.#settings = Object.assign({ messages: Messages }, $settings)
  }
  // get type() { return this.#settings.type }
  get definition() { return this.#settings.definition }
  get key() { return this.#settings.key }
  get value() { return this.#settings.value }
  get properties() {
    if(this.#_properties !== undefined) return this.#_properties
    this.#_properties = this.#settings.properties
    return this.#_properties
  }
  get advance() { return this.#_advance }
  get deadvance() { return this.#_deadvance }
  get unadvance() { return this.#_unadvance }
  get valid() { return this.#_valid }
  set valid($valid) {
    if(this.#_valid === undefined) {
      this.#_valid = $valid
    }
  }
}