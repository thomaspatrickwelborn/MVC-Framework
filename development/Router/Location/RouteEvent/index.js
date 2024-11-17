export default class RouteEvent extends Event {
  #settings
  constructor($type, $settings) {
    super($type, $settings)
    this.#settings = $settings
  }
  get path() { return this.#settings.path }
  get route() { return this.#settings.route }
  get location() { return this.#settings.location }
}