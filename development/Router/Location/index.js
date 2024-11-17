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
  #_activeRoute
  #_boundPopState
  // Window Location Properties
  #_protocol
  #_hostname
  #_port
  #_origin
  #_pathname
  #_hash
  #_search
  #_href
  constructor($settings, $options) {
    super(
      recursiveAssign(Settings, $settings),
      recursiveAssign(Options, $options),
    )
    this.enableEvents()
    this.#popState()
  }
  get window() {
    if(this.#_window !== undefined) return this.#_window
    this.#_window = window
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
  get activeRoute() {
    let route
    iterateRoutes: 
    for(const $route of Object.values(this.routes)) {
      if($route.active) {
        route = $route
        break iterateRoutes
      }
    }
    return route
  }
  get #boundPopState() {
    if(this.#_boundPopState !== undefined) return this.#_boundPopState
    this.#_boundPopState = this.#popState.bind(this)
    return this.#_boundPopState
  }
  // Window Location Properties
  get protocol() {
    if(this.#_protocol !== undefined) return this.#_protocol
    this.#_protocol = this.window.location.protocol
    return this.#_protocol
  }
  set protocol($protocol) {
    if($protocol !== this.#_protocol) {
      this.#_protocol = $protocol
    }
  }
  get hostname() {
    if(this.#_hostname !== undefined) return this.#_hostname
    this.#_hostname = this.window.location.hostname
    return this.#_hostname
  }
  set hostname($hostname) {
    if($hostname !== this.#_hostname) {
      this.#_hostname = $hostname
    }
  }
  get port() {
    if(this.#_port !== undefined) return this.#_port
    this.#_port = this.window.location.port
    return this.#_port
  }
  set port($port) {
    if($port !== this.#_port) {
      this.#_port = $port
    }
  }
  get origin() {
    if(this.#_origin !== undefined) return this.#_origin
    this.#_origin = this.window.location.origin
    return this.#_origin
  }
  set origin($origin) {
    if($origin !== this.#_origin) {
      this.#_origin = $origin
    }
  }
  get pathname() {
    if(this.#_pathname !== undefined) return this.#_pathname
    this.#_pathname = this.window.location.pathname
    return this.#_pathname
  }
  set pathname($pathname) {
    if($pathname !== this.#_pathname) {
      const preter = this.#_pathname
      const anter = $pathname
      this.#_pathname = anter
      this.dispatchEvent(
        new RouteEvent("route:pathname", {
          detail: { preter, anter }
        }, this)
      )
    }
  }
  get hash() {
    if(this.#_hash !== undefined) return this.#_hash
    this.#_hash = this.window.location.hash
    return this.#_hash
  }
  set hash($hash) {
    if($hash !== this.#_hash) {
      const preter = this.#_hash
      const anter = $hash
      this.#_hash = anter
      this.dispatchEvent(
        new RouteEvent("route:hash", {
          detail: { preter, anter }
        }, this)
      )
    }
  }
  get search() {
    if(this.#_search !== undefined) return this.#_search
    this.#_search = this.window.location.search
    return this.#_search
  }
  set search($search) {
    if($search !== this.#_search) {
      const preter = this.#_search
      const anter = $search
      this.#_search = anter
      this.dispatchEvent(
        new RouteEvent("route:search", {
          detail: { preter, anter }
        }, this)
      )
    }
  }
  get href() {
    if(this.#_href !== undefined) return this.#_href
    this.#_href = this.window.location.href
    return this.#_href
  }
  set href($href) {
    if($href !== this.#_href) {
      const preter = this.#_href
      const anter = $href
      this.#_href = anter
      this.dispatchEvent(
        new RouteEvent("route:href", {
          detail: { preter, anter }
        }, this)
      )
    }
  }
  // Methods
  #popState() {
    const preterRoute = this.activeRoute
    if(preterRoute) preterRoute.active = false
    const { pathname, hash } = this.window.location
    const path = (this.hashpath) ? hash.slice(1) : pathname
    const route = this.matchRoute(path)
    console.log('route', route)
    if(route && route?.enable) {
      route.active = true
      this.protocol = this.window.location.protocol
      this.hostname = this.window.location.hostname
      this.port = this.window.location.port
      this.pathname = this.window.location.pathname
      this.hash = this.window.location.hash
      this.search = this.window.location.search
      this.href = this.window.location.href
      this.dispatchEvent(
        new RouteEvent("route", {
          detail: {
            preterRoute, 
            anterRoute: route,
          }
        }, this)
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
      window: this.window,
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
  matchRoute($path) {
    const routeEntries = Object.entries(this.routes)
    let routeEntryIndex = 0
    let route
    iterateMatchEntries: 
    while(routeEntryIndex < routeEntries.length) {
      const [$routePath, $route] = routeEntries[routeEntryIndex]
      if($route.match($path)) {
        route = $route
        break iterateMatchEntries
      }
      routeEntryIndex++
    }
    return route
  }
}