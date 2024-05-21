import Events from './Interfaces/Response/Events/index.js'
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
    iterateRoutes:
    for(let [
      $path, $resourceMethods
    ] of Object.entries($routes)) {
      _routes[$path] = _routes[$path] || {}
      const _route = _routes[$path]
      iterateResourceMethods:
      for(let [
        $resourceMethodName, $options
      ] of Object.entries($resourceMethods)) {
        Object.defineProperty(_route, $resourceMethodName, {
          value: async function() {
            const resource = String.prototype.concat(
              $this.#origin, $path
            )
            let fetchSource = await fetch(resource, $options)
            .then(($fetchSource) => {
              $this
              .createEvent($this, 'ok', $fetchSource.clone())
              .createEvent($this, 'status', $fetchSource.clone())
              .createEvent($this, 'statusCode', $fetchSource.clone())
              .createEvent($this, 'statusText', $fetchSource.clone())
              .createEvent($this, 'statusTextMessage', $fetchSource.clone())
              return $fetchSource
            })
            return fetchSource
          }
        })
      }
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
  createEvent($eventTarget, $eventType, $response) {
    const event = Events[$eventType]($response)
    $eventTarget.dispatchEvent(event)
    return this
  }
}
