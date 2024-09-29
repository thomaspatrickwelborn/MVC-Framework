export default class Validator extends EventTarget {
  #settings
  constructor($settings = {}) {
    super()
    this.#settings = $settings
  }
  get type() { return this.#settings.type }
  get validate() { return this.#settings.validate }
}