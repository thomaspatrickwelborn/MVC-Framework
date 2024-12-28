const Messages = {
  'true': ($verification) => `${$verification.pass}`,
  'false': ($verification) => `${$verification.pass}`,
}
export default class Validator extends EventTarget {
  #_settings
  #_context
  constructor($settings = {}, $context) {
    super()
    this.settings = Object.freeze(
      Object.assign({ messages: Messages }, $settings)
    )
    this.context = $context
  }
  get settings() { return this.#_settings }
  set settings($settings) { this.#_settings = $settings }
  get context() { return this.#_context }
  set context($context) {
    if(this.#_context !== undefined) { return this.#_context }
    this.#_context = $context
    return this.#_context
  }
  get type() { return this.settings.type }
  get messages() { return this.settings.messages }
  get validate() { return this.settings.validate }
}