import FetchRoute from './fetchRoute/index.js'
import Core from '../../core/index.js'
import Settings from './settings/index.js'
import Options from './options/index.js'
export default class FetchRouter extends Core {
  #scheme
  #domain
  #port
  #_authority
  #_origin
  #routes = {}
  constructor($settings, $options) {
    super(Settings($settings), Options($options))
    const { scheme, domain, port, routes } = $settings
    this.#scheme = scheme
    this.#domain = domain
    this.#port = port
    this.routes = routes
    if($options.enableEvents === true) this.enableEvents()
  }
  get #authority() {
    if(this.#_authority === undefined) {
      this.#_authority = String.prototype.concat(
        this.#domain, ':', this.#port
      )
    }
    return this.#_authority
  }
  get #origin() {
    if(this.#_origin === undefined) {
      this.#_origin = String.prototype.concat(
        this.#scheme, '://', this.#authority
      )
    }
    return this.#_origin
  }
  get routes() { return this.#routes }
  set routes($routes) { this.addRoutes($routes) }
  addRoutes($routes) {
    const $this = this
    const _routes = this.#routes
    for(let [
      $routePath, $routeSettings
    ] of Object.entries($routes)) {
      $routeSettings.origin = this.#origin
      $routeSettings.path = $routePath
      _routes[$routeSettings.name] = new FetchRoute($routeSettings)
    }
    return this
  }
  removeRoutes($routes) {
    const _routes = this.#routes
    for(const $path of $routes) {
      delete _routes[$path]
    }
    return this
  }
}
