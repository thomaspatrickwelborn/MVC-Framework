export default class Precondition extends EventTarget {
  length = 0
  #settings
  #options
  #_id
  constructor($settings = []) {
    super()
    this.#settings = $settings
    this.#options = $options
  }
  get id() {
    if(this.#_id !== undefined) return this.#_id
    this.#_id = this.#settings.id
    return this.#_id
  }
}