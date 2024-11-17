export default class RouteEvent extends Event {
  #settings
  #router
  #_route
  constructor($type, $settings, $router) {
    super($type, $settings)
    this.#settings = $settings
    this.#router = $router
  }
  get detail() { return this.#settings.detail }
  get protocol() { return this.#router.protocol }
  get hostname() { return this.#router.hostname }
  get port() { return this.#router.port }
  get pathname() { return this.#router.pathname }
  get hash() { return this.#router.hash }
  get search() { return this.#router.search }
  get href() { return this.#router.href }
}