export default class LocalStorage extends EventTarget {
  #db = localStorage
  #_path
  constructor($path) {
    super()
    this.path = $path
  }
  get path() { return this.#_path }
  set path($path) {
    if(this.#_path !== undefined) return
    this.#_path = $path
  }
  get() {
    return JSON.parse(this.#db.getItem(this.path))
  }
  set($content) {
    return this.#db.setItem(this.path, JSON.stringify($content))
  }
  remove() {
    return this.#db.removeItem(this.path)
  }
}