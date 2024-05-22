import DynamicEventTarget from '../../Core/DynamicEventTarget/index.js'
import Route from './Route/index.js'
import { Core } from '/mvc-framework/index.js'
export default class ServerRouter extends Core {
  #scheme
  #domain
  #port
  #_authority
  get #authority() {
    if(this.#_authority === undefined) {
      this.#_authority = String.prototype.concat(
        this.#domain, ':', this.#port
      )
    }
    return this.#_authority
  }
  #_origin
  get #origin() {
    if(this.#_origin === undefined) {
      this.#_origin = String.prototype.concat(
        this.#scheme, '://', this.#authority
      )
    }
    return this.#_origin
  }
  constructor($settings = Settings, $options = Options) {
    super(...arguments)
    const { scheme, domain, port, routes} = $settings
    this.#scheme = scheme
    this.#domain = domain
    this.#port = port
    this.routes = routes
  }
  #_routes = {}
  get routes() { return this.#_routes }
  set routes($routes) { this.addRoutes($routes) }
  addRoutes($routes) {
    const $this = this
    const _routes = this.#_routes
    for(let [
      $routePath, $routeSettings
    ] of Object.entries($routes)) {
      $routeSettings.origin = this.#origin
      $routeSettings.path = $routePath
      _routes[$routeSettings.name] = new Route($routeSettings)
    }
    return this
  }
  removeRoutes($routes) {
    const _routes = this.#_routes
    for(const $path of $routes) {
      delete _routes[$path]
    }
    return this
  }
}
