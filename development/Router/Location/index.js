import { recursiveAssign } from '../../Coutil/index.js'
import Core from '../../Core/index.js'
import Route from './Route/index.js'
import RouteEvent from './RouteEvent/index.js'
const Settings = { routes: {} }
const Options = {}
export default class LocationRouter extends Core {
  #_window
  #_hashpath
  #_routes
  #_location
  #_route
  #_boundPopState
  constructor($settings, $options) {
    super(
      recursiveAssign(Settings, $settings),
      recursiveAssign(Options, $options),
    )
    this.window
    this.enableEvents()
    // this.#popState()
  }
  get window() {
    if(this.#_window !== undefined) return this.#_window
    this.#_window = window
    this.#_window.addEventListener('load', this.#boundPopState, { once: true })
    this.#_window.addEventListener('popstate', this.#boundPopState)
    return this.#_window
  }
  get hashpath() {
    if(this.#_hashpath !== undefined) return this.#_hashpath
    this.#_hashpath = (
      this.settings.hashpath === undefined
    ) ? false
      : this.settings.hashpath
    return this.#_hashpath
  }
  get routes() {
    if(this.#_routes !== undefined) return this.#_routes
    this.#_routes = {}
    const routeEntries = Object.entries(this.settings.routes)
    for(const [$routePath, $routeSettings] of routeEntries) {
      this.setRoute($routePath, $routeSettings)
    }
    return this.#_routes
  }
  get location() { return this.#_location }
  get route() { return this.#_route }
  get #boundPopState() {
    if(this.#_boundPopState !== undefined) return this.#_boundPopState
    this.#_boundPopState = this.#popState.bind(this)
    return this.#_boundPopState
  }
  // Methods
  #popState() {
    const preterRoute = this.route
    if(preterRoute) preterRoute.active = false
    const { pathname, hash } = this.window.location
    const path = (this.hashpath) ? hash.slice(1) : pathname
    const { route, location } = this.#matchRoute(path)
    if(route && route?.enable) {
      route.active = true
      location.state = history.state
      location.pathname = this.window.location.pathname
      location.hash = this.window.location.hash
      location.search = this.window.location.search
      delete location.path
      this.#_route = route
      this.#_location = location
      this.dispatchEvent(
        new RouteEvent("route", { path, route, location })
      )
    }
    else {
      this.#_route = null
      this.#_location = null
      this.dispatchEvent(
        new RouteEvent("error", { path })
      )
    }
  }
  // Route Ability
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
  // Route Ministration 
  setRoute($routePath, $routeSettings) {
    const routeSettings = recursiveAssign({
      basename: $routePath,
    }, $routeSettings)
    this.#_routes[$routePath] = new Route(routeSettings)
    return this.#_routes[$routePath]
  }
  getRoute($routePath) {
    return this.#_routes[$routePath]
  }
  deleteRoute($routePath) {
    delete this.#_routes[$routePath]
    return this.#_routes[$routePath]
  }
  #matchRoute($path) {
    const routeEntries = Object.entries(this.routes)
    let routeEntryIndex = 0
    let route = null
    let location = null
    iterateMatchEntries: 
    while(routeEntryIndex < routeEntries.length) {
      const [$routePath, $route] = routeEntries[routeEntryIndex]
      location = $route.match($path) || null
      if(location) {
        route = $route
        break iterateMatchEntries
      }
      routeEntryIndex++
    }
    return { route, location }
  }
}