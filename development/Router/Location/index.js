import { match } from '../../node_modules/path-to-regexp/dist/index.js'
import { recursiveAssign } from '../../Coutil/index.js'
import Core from '../../Core/index.js'
const Settings = { routes: {} }
const Options = {}
export default class LocationRouter extends Core {
  #_window
  #_match
  #_routes
  constructor($settings, $options) {
    super(
      recursiveAssign(Settings, $settings),
      recursiveAssign(Options, $options),
    )
    this.window
  }
  get window() {
    if(this.#_window !== undefined) return this.#_window
    this.#_window = window
    this.window.addEventListener('load', ($event) => {
      this.dispatchEvemt(new CustomEvent("route", {
        detail: route
      }), { once: true })
    })
    this.#_window.addEventListener('popstate', ($event) => {
      const routePath = this.#_window.location.pathname.concat(
        this.#_window.location.hash
      )
      const route = this.#findRouteByPath(routePath)
      this.dispatch(new CustomEvent("route", {
        detail: route
      }))
    })
    return this.#_window
  }
  get routes() { return this.settings.routes }
  #findRouteByPath($path) {
    const routeEntries = Object.entries(this.routes)
    let routeEntryIndex = 0
    let route
    iterateMatchEntries: 
    while(routeEntryIndex < routeEntries.length) {
      const [$routePath, $routeSettings] = routeEntries[routeEntryIndex]
      const routeMatch = match($routePath)
      route = routeMatch($path)
      if(route) {
        route = recursiveAssign(route, this.routes[$routePath])
        break iterateMatchEntries
      }
      routeEntryIndex++
    }
    return route
  }
}