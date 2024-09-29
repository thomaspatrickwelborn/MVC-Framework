export default class Validation extends EventTarget {
  #settings
  #_type
  #_valid = false
  #_contentKey
  #_contentVal
  #_contextVal
  constructor($settings = {}) {
    super()
    this.#settings = $settings
    const {
      type, valid, contextVal, contentKey, contentVal
    } = this.#settings
    this.type = type
    this.valid = valid
    this.contextVal = contextVal
    this.contentKey = contentKey
    this.contentVal = contentVal
  }
  // Type
  get type() { return this.#_type }
  set type($type) { this.#_type = $type }
  // Valid
  get valid() { return this.#_valid }
  set valid($valid) { this.#_valid = $valid }
  // Context Key
  get contextVal() { return this.#_contextVal }
  set contextVal($contextVal) { this.#_contextVal = $contextVal }
  // Content Key
  get contentKey() { return this.#_contentKey }
  set contentKey($contentKey) { this.#_contentKey = $contentKey }
  // Content Val
  get contentVal() { return this.#_contentVal }
  set contentVal($contentVal) { this.#_contentVal = $contentVal }
}