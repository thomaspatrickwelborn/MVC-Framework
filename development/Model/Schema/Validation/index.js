export default class Validation extends EventTarget {
  #settings
  // #_type
  #_valid
  #_context
  #_contentKey
  #_contentVal
  #_message
  constructor($settings = {}) {
    super()
    this.#settings = Object.freeze($settings)
  }
  // get type() { return this.#settings.type }
  get valid() { return this.#_valid }
  set valid($valid) {
    if(this.#_valid === undefined) {
      this.#_valid = $valid
    }
  }
  get message() {
    if(this.#_message !== undefined) return this.#_message
    if(
      this.valid !== undefined &&
      this.#_message === undefined
    ) {
      this.#_message = this.#settings.messages[this.#_valid](this)
    }
    return this.#_message
  }
  get context() { return this.#settings.context }
  get contextKey() { return this.#settings.contentKey }
  get contextVal() { return this.#settings.context }
  get contentKey() { return this.#settings.contentKey }
  get contentVal() { return this.#settings.context[this.contextKey] }
}