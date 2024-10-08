export default class Validation extends EventTarget {
  #settings
  #_type
  #_valid
  #_context
  #_contentKey
  #_contentVal
  #_message
  constructor($settings = {}) {
    super()
    this.#settings = Object.freeze($settings)
  }
  // Property: Type
  get type() { return this.#settings.type }
  // Property: Valid
  get valid() { return this.#_valid }
  set valid($valid) {
    if(this.#_valid === undefined) {
      this.#_valid = $valid
    }
  }
  // Property: Message
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
  // Property: Context
  get context() { return this.#settings.context }
  // Property: Context Key
  get contextKey() { return this.#settings.contentKey }
  // Property: Context Val
  get contextVal() { return this.#settings.context[this.contentKey] }
  // Property: Content Key
  get contentKey() { return this.#settings.contentKey }
  // Property: Content Val
  get contentVal() { return this.#settings.contentVal }
}