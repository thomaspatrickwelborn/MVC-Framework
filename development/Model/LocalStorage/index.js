export default class LocalStorage extends EventTarget {
  #settings
  constructor($settings, $options) {
    super()
    this.#settings = $settings
  }
  get() { localStorage.getItem(this.#settings) }
  set($content) { localStorage.setItem(this.#settings, $content) }
  remove() { localStorage.removeItem(this.#settings) }
}