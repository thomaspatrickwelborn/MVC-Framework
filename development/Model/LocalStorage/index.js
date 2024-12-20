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
    let dbItem
    try{ return JSON.parse(this.#db.getItem(this.path)) }
    catch($err) { console.log($err) }
    return
  }
  set($content) {
    try { return this.#db.setItem(this.path, JSON.stringify($content)) }
    catch($err) { console.log($err) }
    return
  }
  remove() {
    try { return this.#db.removeItem(this.path) }
    catch($err) { console.log($err) }
    return
  }
}