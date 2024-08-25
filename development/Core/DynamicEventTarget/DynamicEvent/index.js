export default class DynamicEventTargetEvent extends Event {
  #settings
  constructor($type, $settings) {
    super($type)
    this.#settings = $settings
  }
  get basename() { return this.#settings.basename }
  get path() { return this.#settings.path }
  get detail() { return this.#settings.detail }
}