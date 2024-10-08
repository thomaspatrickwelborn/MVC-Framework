export default class Validator extends EventTarget {
  #settings
  constructor($settings = {}) {
    super()
    this.#settings = $settings
    // Property: Validate
    Object.defineProperties(this, {
      'validate': {
        configurable: false,
        writable: false,
        enumerable: true,
        value: this.#settings.validate
      }
    })
  }
  // Property: Type
  get type() { return this.#settings.type }
  // Property: Messages
  get messages() { return this.#settings.messages }
}