export default class Conclusion extends EventTarget {
  #settings
  #_parent
  constructor($settings = {}) {
    super()
    this.#settings = $settings
  }
  get parent() {
    if(this.#_parent !== undefined) return this.#_parent
    this.#_parent = this.#settings.parent
    return this.#_parent
  }
}