// import * as pathToRegExp from '../../node_modules/path-to-regexp/dist/index.js'
import { match } from '../../node_modules/path-to-regexp/dist/index.js'
console.log(match)
// const pathToRegExp = await import('../../node_modules/path-to-regexp/dist/index.js')
import { recursiveAssign } from '../../Coutil/index.js'
import Core from '../../Core/index.js'
const Settings = { routes: {} }
const Options = {}
export default class LocationRouter extends Core {
  #_routes
  constructor($settings, $options) {
    super(
      recursiveAssign(Settings, $settings),
      recursiveAssign(Options, $options),
    )
  }
  get routes() {
    if(this.#_routes !== undefined) return this.#_routes
    this.#_routes = {}
    for(const [
      $routeName, $routeListener
    ] of Object.entries(this.settings.routes)) {
      this.#_routes[$routeName] = $routeListener
    }
    return this.#_routes
  }
}