export default class RouteEvent extends Event {
  #settings
  constructor($type, $settings) {
    super($type, $settings)
    this.#settings = $settings
  }
  get route() { return this.#settings.route }
}