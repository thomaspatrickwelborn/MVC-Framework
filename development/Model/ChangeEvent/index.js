export default class ChangeEvent extends CustomEvent {
  #settings
  #content
  #_key
  constructor($type, $settings, $content) {
    super($type, $settings)
    this.#settings = $settings
  }
  get originalEvent() { return this.#settings.originalEvent }
  get key() {
    if(this.#_key !== undefined) { return this.#_key }
    if(this.path) { this.#_key = this.path.split('.').pop() }
    else { this.#_key = null }
    return this.#_key
  }
  get change() { return this.#settings.change }
  get value() { return this.#settings.value }
  get path() { return this.#settings.path }
  get detail() { return this.#settings.detail }
}