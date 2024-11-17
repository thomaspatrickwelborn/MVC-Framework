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
  constructor($settings, $options) {
    super(
      recursiveAssign(Settings, $settings),
      recursiveAssign(Options, $options),
    )
    this.#popState()
    this.enableEvents()
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
  // Methods
  #popState($event = {}) {
    const preterRoute = this.activeRoute
    if(preterRoute) preterRoute.active = false
    const { pathname, hash } = this.window.location
    const path = (this.hashpath) ? hash.slice(1) : pathname
    const route = this.matchRoute(path)
    if(route && route?.enable) {
      route.active = true
      route.state = $event?.state
      this.dispatchEvent(
        new RouteEvent("route", { route })
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
  matchRoute($path) {
    const routeEntries = Object.entries(this.routes)
    let routeEntryIndex = 0
    let route
    iterateMatchEntries: 
    while(routeEntryIndex < routeEntries.length) {
      const [$routePath, $route] = routeEntries[routeEntryIndex]
      const routeMatch = $route.match($path)
      if(routeMatch) {
        route = Object.entries(Object.getOwnPropertyDescriptors($route))
        .reduce(($propertyDescriptors, [$key, $descriptor]) => {
          $propertyDescriptors[$key] = $descriptor.value
          return $propertyDescriptors
        }, {
          enable: $route.enable
        })
        Object.assign(route, routeMatch)
        break iterateMatchEntries
      }
      routeEntryIndex++
    }
    return route
  }
}