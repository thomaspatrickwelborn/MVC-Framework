export default class Valence extends EventTarget {
  settings
  #_context
  #_contentKey
  #_contentValue
  #_valid
  constructor($settings) {
    this.settings = Object.freeze($settings)
  }
  get type() { return this.settings.type }
  // Content Property
  get contentKey() { return this.settings.contentKey }
  get contentValue() { return this.settings.content[this.contentKey] }
  // Context
  get context() { return this.settings.context }
  // Context Property
  get contextKey() { return this.contentKey }
  get contextValue() { return this.settings.context[this.contextKey] }
  get valid() { return this.#_valid }
  set valid($valid) {
    if(this.#_valid === undefined) {
      this.#_valid = $valid
    }
  }
}