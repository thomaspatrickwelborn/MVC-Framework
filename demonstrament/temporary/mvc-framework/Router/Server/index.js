import { Core } from '/mvc-framework/index.js'
const Settings = {
  routes: {
    // [method]: methodOptions
  },
}
const Options = {
  enable: true,
}
export default class ServerRouter extends Core {
  constructor($settings = Settings, $options = Options) {
    super(...arguments)
    this.routes = $settings.routes
  }
  #_routes = {}
  get routes() { return this.#_routes }
  set routes($routes) {
    const $this = this
    const _routes = this.#_routes
    iterateRoutes:
    for(let [
      $routeSource, $routeMethods
    ] of Object.entries($routes)) {
      _routes[$routeSource] = _routes[$routeSource] || {}
      const _route = _routes[$routeSource]
      iterateRouteMethods:
      for(let [
        $routeMethodName, $routeOptions
      ] of Object.entries($routeMethods)) {
        Object.defineProperty(_route, $routeMethodName, {
          get() {
            const fetchSource = fetch($routeSource, $routeOptions)
            fetchSource.then($fetchSource => this.dispatchEvent(
              console.log($fetchSource)
              // this.dispatchEvent(new CustomEvent(
              //   'fetch:get'
              // ))
            ))
            return fetchSource
          }
        })
        // _routes
      }
    }
  }
}
