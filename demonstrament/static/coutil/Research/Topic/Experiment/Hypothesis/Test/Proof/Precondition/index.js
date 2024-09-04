export default class Precondition extends EventTarget {
  length = 0
  #settings
  #options
  constructor($settings = [], $options = {}) {
    super()
    this.#settings = $settings
    this.#options = $options
  }
}