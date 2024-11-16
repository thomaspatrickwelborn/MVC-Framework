export default class RouteEvent extends Event {
  #settings
  #router
  #_route
  constructor($type, $settings, $router) {
    super($type, $settings)
    this.#settings = $settings
    this.#router = $router
  }
}