export default class RouteEvent extends CustomEvent {
  #options
  constructor($type, $options) {
    super($type, $options)
    this.#options = $options
  }
  get path() { return this.#options.path }
  get route() { return this.#options.route }
  get location() { return this.#options.location }
}