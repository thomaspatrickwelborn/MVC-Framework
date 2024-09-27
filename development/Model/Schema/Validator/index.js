export default class Validator extends EventTarget {
  #settings
  constructor($settings = {}) {
    super()
    this.#settings = $settings
  }
  get type() {
    return this.#settings.type
  }
  get validateArray() {
    return this.#settings.validateArray
  }
  get validateObject() {
    return this.#settings.validateObject
  }
}