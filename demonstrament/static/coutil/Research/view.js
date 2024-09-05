export default class Research extends EventTarget {
  #settings
  #_parent
  constructor() {
    super()
  }
  get parent() {
    if(this.#_parent !== undefined) return this.#_parent
    this.#_parent = this.#settings.parent
    return this.#_parent
  }
}