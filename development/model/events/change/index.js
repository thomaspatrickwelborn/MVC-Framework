export default class ChangeEvent extends CustomEvent {
  #settings
  #content
  #key
  constructor($type, $settings, $content) {
    super($type, $settings)
    this.#settings = $settings
  }
  get originalEvent() { return this.#settings.originalEvent }
  get key() {
    if(this.#key !== undefined) { return this.#key }
    if(this.path) { this.#key = this.path.split('.').pop() }
    else { this.#key = null }
    return this.#key
  }
  // get change() { return this.#settings.change }
  get value() { return this.#settings.value }
  get path() { return this.#settings.path }
  get detail() { return this.#settings.detail }
}