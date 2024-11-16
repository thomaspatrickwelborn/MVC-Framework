export default class RouteEvent extends Event {
  #settings
  #router
  #_route
  constructor($type, $settings, $router, $route) {
    super($type, $settings)
    this.#settings = $settings
    this.#router = $router
    this.#_route = $route
  }
  get route() { return this.#_route }
}