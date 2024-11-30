export default class Validator extends EventTarget {
  #settings
  constructor($settings = {}) {
    super()
    this.#settings = Object.freeze($settings)
  }
  get type() { return this.#settings.type }
  get messages() { return this.#settings.messages }
  get validate() { return this.#settings.validate }
}