const Messages = {
  'true': ($verification) => `${$verification.pass}`,
  'false': ($verification) => `${$verification.pass}`,
}
export default class Validator extends EventTarget {
  #_settings
  #_schema
  constructor($settings = {}, $schema) {
    super()
    this.settings = Object.freeze(
      Object.assign({ messages: Messages }, $settings)
    )
    this.schema = $schema
  }
  get settings() { return this.#_settings }
  set settings($settings) { this.#_settings = $settings }
  get schema() { return this.#_schema }
  set schema($schema) {
    if(this.#_schema !== undefined) { return this.#_schema }
    this.#_schema = $schema
    return this.#_schema
  }
  get type() { return this.settings.type }
  get messages() { return this.settings.messages }
  get validate() { return this.settings.validate }
}