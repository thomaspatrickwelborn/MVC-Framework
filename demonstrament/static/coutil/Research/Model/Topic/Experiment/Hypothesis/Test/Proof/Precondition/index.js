export default class Precondition extends EventTarget {
  length = 0
  #settings
  #_id
  constructor($settings = []) {
    super()
    this.#settings = $settings
  }
  get id() {
    if(this.#_id !== undefined) return this.#_id
    this.#_id = this.#settings.id
    return this.#_id
  }
}