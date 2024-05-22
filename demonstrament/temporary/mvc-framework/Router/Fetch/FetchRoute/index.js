import Events from '../Interfaces/Response/Events/index.js'
export default class FetchRoute extends EventTarget {
  #settings = {}
  #name
  #origin
  #path
  constructor($settings = {}) {
    super()
    this.#settings = $settings
    this.#name = $settings.name
    this.#origin = $settings.origin
    this.#path = $settings.path
    const $this = this
    iterateMethods:
    for(const [
      $methodName, $methodOptions
    ] of Object.entries($settings.methods)) {
      const abortSignalKey = `${$methodName}AbortSignal`
      Object.defineProperties($this, {
        [abortSignalKey]: {
          enumerable: false,
          writable: true,
          value: undefined,
        },
        [$methodName]: {
          enumerable: true,
          writable: false,
          configurable: false,
          value: async function() {
            const resource = String.prototype.concat(
              $this.#origin, $this.#path
            )
            if($this[abortSignalKey] !== undefined) {
              $this[abortSignalKey].abort()
              $this.#createEvent($this, 'abort', $this[abortSignalKey])
            }
            $this[abortSignalKey] = new AbortController()
            $methodOptions.signal = $this[abortSignalKey].signal
            let fetchSource = await fetch(resource, $methodOptions)
            .then(($fetchSource) => {
              $this
              .#createEvent($this, 'ok', $fetchSource.clone())
              .#createEvent($this, 'status', $fetchSource.clone())
              .#createEvent($this, 'statusCode', $fetchSource.clone())
              .#createEvent($this, 'statusText', $fetchSource.clone())
              .#createEvent($this, 'statusTextMessage', $fetchSource.clone())
              return $fetchSource
            })
            .catch(($err) => { /* console.log($err) */ })
            return fetchSource
          }
        }
      })
    }
  }
  #createEvent($eventTarget, $eventType, $response) {
    const event = Events[$eventType]($response)
    $eventTarget.dispatchEvent(event)
    return this
  }
}