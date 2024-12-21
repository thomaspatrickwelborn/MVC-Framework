export default class Model extends EventTarget {
  #_settings
  #_path
  #_content = new Map()
  constructor($settings) {
    super()
    this.#_settings = $settings
    this.set(this.settings.content)
  }
  get settings() { return this.#_settings }
  get location() { return window.location.pathname }
  get content() { return Object.fromEntries(this.#_content) }
  get path() {
    if(this.#_path !== undefined) return this.#_path
    let { pathname } = window.location
    this.#_path = [
      window.location.pathname, this.#_settings.path
    ].join('')
    return this.#_path
  }
  // Map Methods
  get() {
    const $arguments = Array.from(arguments)
    if($arguments.length === 1) { return this.#_content.get($arguments[0]) }
    else if($arguments.length === 0) { return this.#_content }
  }
  set() {
    const $arguments = Array.from(arguments)
    if($arguments.length === 1) {
      for(const [$key, $value] of Object.entries($arguments[0])) {
        this.#_content.set($key, $value)
      }
    }
    else if($arguments.length === 2) {
      const [$key, $value] = $arguments
      this.#_content.set($key, $value)
    }
    this.save()
    return this
  }
  delete() {
    const $arguments = Array.from(arguments)
    if($arguments.length === 1) {
      const [$key] = $arguments
      this.#_content.delete($key)
    }
    return this
  }
  clear() {
    this.#_content.clear()
    return this
  }
  // Local Storage Methods
  read() { return JSON.parse(localStorage.getItem(this.path)) }
  load() { return Object.assign(this.content, this.read()) }
  save() { return localStorage.setItem(this.path, this.string) }
  remove() { return localStorage.removeItem(this.path) }
}
