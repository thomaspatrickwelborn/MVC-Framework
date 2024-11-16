import { recursiveAssign } from '../../Coutil/index.js'
import Core from '../../Core/index.js'
import Route from './Route/index.js'
import RouteEvent from './RouteEvent/index.js'
const Settings = { routes: {} }
const Options = {}
export default class LocationRouter extends Core {
  #_boundPopState
  #_window
  #_routes
  constructor($settings, $options) {
    super(
      recursiveAssign(Settings, $settings),
      recursiveAssign(Options, $options),
    )
    const { pathname, hash } = this.window.location
    this.#popState()
  }
  get hashpath() { return this.settings.hashpath }
  get routes() {
    if(this.#_routes !== undefined) return this.#_routes
    this.#_routes = {}
    const routeEntries = Object.entries(this.settings.routes)
    for(const [$routePath, $routeSettings] of routeEntries) {
      this.setRoute($routePath, $routeSettings)
    }
    return this.#_routes
  }
  get window() {
    if(this.#_window !== undefined) return this.#_window
    this.#_window = window
    this.#_window.addEventListener('popstate', this.#boundPopState)
    return this.#_window
  }
  get #boundPopState() {
    if(this.#_boundPopState !== undefined) return this.#_boundPopState
    this.#_boundPopState = this.#popState.bind(this)
    return this.#_boundPopState
  }
  #popState() {
    const { pathname, hash } = this.window.location
    const route = this.getRoute(pathname, hash)
    if(route && route?.enable) { this.dispatchEvent(
      new RouteEvent("route", {}, this, route)
    ) }
  }
  enableRoute($path) {
    const route = this.getRoute($path)
    route.enable = true
    return route
  }
  disableRoute($path) {
    const route = this.getRoute($path)
    route.enable = false
    return route
  }
  setRoute($routePath, $routeSettings) {
    const routeSettings = recursiveAssign({
      basename: $routePath
    }, $routeSettings)
    this.#_routes[$routePath] = new Route(routeSettings)
    return this.#_routes[$routePath]
  }
  getRoute($path) {
    const routeEntries = Object.entries(this.routes)
    let routeEntryIndex = 0
    let route
    iterateMatchEntries: 
    while(routeEntryIndex < routeEntries.length) {
      const [$routePath, $route] = routeEntries[routeEntryIndex]
      route = $route.match($routePath)
      if(route) {
        route = recursiveAssign(route, this.routes[$routePath])
        break iterateMatchEntries
      }
      routeEntryIndex++
    }
    return route
  }
  deleteRoute($routePath) {
    delete this.#_routes[$routePath]
    return this.#_routes[$routePath]
  }
}