export default class PropertyValidation extends EventTarget {
  #_advance = []
  #_deadvance = []
  #_unadvance = []
  #_valid
  constructor() {
    super(...arguments)
  }
  get type() { return this.settings.type }
  get context() { return this.settings.context }
  get key() { return this.settings.key }
  get value() { return this.settings.value }
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