export default class Validator extends EventTarget {
  #_settings
  constructor($settings = {}) {
    super()
    this.settings = Object.freeze($settings)
  }
  get settings() { return this.#_settings }
  set settings($settings) { this.#_settings = $settings }
  get type() { return this.settings.type }
  get messages() { return this.settings.messages }
  get validate() { return this.settings.validate }
}