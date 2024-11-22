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
  #_enable
  #_popstate
  #_boundPopstate
  #regularExpressions = {
    windowLocationOrigin: new RegExp(`^${this.window.location.origin}`)
  }
  constructor($settings, $options) {
    super(
      recursiveAssign(Settings, $settings),
      recursiveAssign(Options, $options),
    )
    this.enableEvents()
    this.enable = true
  }
  get base() { return this.settings.base }
  get window() {
    if(this.#_window !== undefined) return this.#_window
    this.#_window = window
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
  get enable() { return this.#_enable }
  set enable($enable) {
    if(this.#_enable === $enable) return
    const boundPopstate = this.#boundPopstate
    if($enable === true) {
      this.#_window.addEventListener('popstate', boundPopstate)
    }
    else if($enable === false) {
      this.#_window.removeEventListener('popstate', boundPopstate)
    }
    this.#_enable = $enable
  }
  #boundPopstate() {
    if(this.#_boundPopstate !== undefined) { return this.#_boundPopstate }
    this.#_boundPopstate = this.#popstate.bind(this)
    return this.#_boundPopstate
  }
  #popstate() { this.navigate() }
  navigate($path, $method) {
    if(
      typeof $path === 'string' && 
      ['assign', 'replace'].includes($method)
    ) {
      this.window?.location[$method]($path)
      return this
    }
    const base = [this.window.origin, this.base].join('')
    let matchPath, matchRoute
    if(this.hashpath) {
      matchPath = this.window.location.hash.slice(1)
      matchRoute = this.#matchRoute(matchPath)
    }
    else {
      matchPath = this.window.location.href
      .replace(new RegExp(`^${this.window.origin}`), '')
      .replace(new RegExp(`^${this.base}`), '')
      matchRoute = this.#matchRoute(matchPath)
    }
    const { route, location } = matchRoute
    const routeEventOptions = {
      route: route,
      location: location,
      path: matchPath,
    }
    const preterRoute = this.route
    if(preterRoute) { preterRoute.active = false }
    if(route && route?.enable) {
      route.active = true
      location.state = this.window.history.state
      location.base = this.base
      location.pathname = this.window.location.pathname
      .replace(new RegExp(`^${this.base}`), '')
      location.hash = this.window.location.hash
      location.search = this.window.location.search
      delete location.path
      this.#_route = route
      this.#_location = location
      this.dispatchEvent(
        new RouteEvent("route", routeEventOptions)
      )
      this.dispatchEvent(
        new RouteEvent(`route:${route.name}`, routeEventOptions)
      )
    }
    else {
      this.#_route = null
      this.#_location = null
      this.dispatchEvent(
        new RouteEvent("nonroute", routeEventOptions)
      )
    }
    return this
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
      pathname: $routeSettings.pathname || $routePath,
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