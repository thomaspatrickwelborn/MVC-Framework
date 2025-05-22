import Core from '../../core/index.js'
import { recursiveAssign } from 'recourse'
import Route from './route/index.js'
import RouteEvent from './routeEvent/index.js'
import Settings from './settings/index.js' 
import Options from './options/index.js' 
export default class LocationRouter extends Core {
  #window
  #hashpath
  #routes
  #location
  #route
  #enable
  #regularExpressions = {
    windowLocationOrigin: new RegExp(`^${this.window.location.origin}`)
  }
  constructor($settings, $options) {
    super(Settings($settings), Options($options))
    if($options.enableEvents === true) this.enableEvents()
    this.enable = true
  }
  get base() { return this.settings.base }
  get window() {
    if(this.#window !== undefined) return this.#window
    this.#window = window
    return this.#window
  }
  get hashpath() {
    if(this.#hashpath !== undefined) return this.#hashpath
    this.#hashpath = (
      this.settings.hashpath === undefined
    ) ? false
      : this.settings.hashpath
    return this.#hashpath
  }
  get routes() {
    if(this.#routes !== undefined) return this.#routes
    this.#routes = {}
    const routeEntries = Object.entries(this.settings.routes)
    for(const [$routePath, $routeSettings] of routeEntries) {
      this.setRoute($routePath, $routeSettings)
    }
    return this.#routes
  }
  get location() { return this.#location }
  get route() { return this.#route }
  get enable() { return this.#enable }
  set enable($enable) {
    if(this.#enable === $enable) return
    const boundPopstate = this.#popstate.bind(this)
    if($enable === true) {
      this.#window.addEventListener('popstate', boundPopstate)
    }
    else if($enable === false) {
      this.#window.removeEventListener('popstate', boundPopstate)
    }
    this.#enable = $enable
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
      this.#route = route
      this.#location = location
      this.dispatchEvent(
        new RouteEvent("route", routeEventOptions)
      )
      this.dispatchEvent(
        new RouteEvent(`route:${route.name}`, routeEventOptions)
      )
    }
    else {
      this.#route = null
      this.#location = null
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
    this.#routes[$routePath] = new Route(routeSettings)
    return this.#routes[$routePath]
  }
  getRoute($routePath) {
    return this.#routes[$routePath]
  }
  deleteRoute($routePath) {
    delete this.#routes[$routePath]
    return this.#routes[$routePath]
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