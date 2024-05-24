import { typeOf } from '../../../Utils/index.js'
import Events from '../Interfaces/Response/Events/index.js'
export default class FetchRoute extends EventTarget {
  #settings = {}
  #name
  #origin
  #path
  constructor($settings = {}) {
    super()
    this.#settings = $settings
    Object.freeze(this.#settings)
    this.#name = this.#settings.name
    this.#origin = this.#settings.origin
    this.#path = this.#settings.path
    this.addMethods(this.#settings.methods)
  }
  addMethods($methods) {
    const $this = this
    iterateMethods:
    for(const [
      $methodName, $methodOptions
    ] of Object.entries($methods)) {
      const abortKey = `${$methodName}AbortSignal`
      Object.defineProperties($this, {
        [abortKey]: {
          enumerable: false,
          writable: true,
          value: undefined,
        },
        [$methodName]: {
          enumerable: true,
          writable: false,
          configurable: false,
          value: async function($resourceOptions = {}) {
            const methodName = $methodName
            const resourceOptions = Object.assign({}, $methodOptions)
            let { urlSearchParams, headers, body, priority } = $resourceOptions
            let pathParameters = new URLSearchParams(urlSearchParams).toString()
            if(pathParameters.length > 0) pathParameters = '?'.concat(pathParameters)
            if(headers !== undefined) Object.assign(resourceOptions.headers, headers)
            if(body !== undefined) resourceOptions.body = body
            if(priority !== undefined) resourceOptions.priority = priority
            const resource = String.prototype.concat(
              $this.#origin, $this.#path, pathParameters
            )
            if($this[abortKey] !== undefined) {
              $this[abortKey].abort()
              $this.createEvent($this, 'abort', $this[abortKey])
            }
            $this[abortKey] = new AbortController()
            resourceOptions.signal = $this[abortKey].signal
            let fetchSource = await fetch(resource, resourceOptions)
            .then(($fetchSource) => {
              $this
              .createEvent($this, 'ok', $fetchSource.clone(), $methodName)
              .createEvent($this, 'status', $fetchSource.clone(), $methodName)
              .createEvent($this, 'statusCode', $fetchSource.clone(), $methodName)
              .createEvent($this, 'statusText', $fetchSource.clone(), $methodName)
              .createEvent($this, 'statusTextMessage', $fetchSource.clone(), $methodName)
              return $fetchSource
            })
            .catch(($err) => { /* console.log($err) */ })
            return fetchSource
          }
        }
      })
    }
  }
  removeMethods($methods) {
    iterateMethods: 
    for(const $methodName of Object.values($methods)) {
      const abortKey = `${$methodName}AbortSignal`
      if(this[abortKey].signal.aborted === false) {
        this[abortKey].abort()
      }
      delete this[abortKey]
      delete this[$methodName]
    }
  }
  createEvent($eventTarget, $eventType, $response, $requestMethod) {
    const event = Events[$eventType]($response, $requestMethod)
    $eventTarget.dispatchEvent(event)
    return this
  }
}