const EventTargetClassPropertyNames = Object.getOwnPropertyNames(EventTarget.prototype)
const ArrayClassPropertyNames = Object.getOwnPropertyNames(Array.prototype)
const ObjectClassPropertyNames = Object.getOwnPropertyNames(Object.prototype)

export default class DynamicEventTarget extends EventTarget {
  constructor($root = {}, $rootAlias) {
    super()
    this.#type = $root
    this.#rootAlias = $rootAlias
    this.#root = this.#type
    this.#proxy = $root
    return this.#proxy
  }
  // Type
  #_type = 'object' // 'array'
  get #type() { return this.#_type }
  set #type($root) {
    this.#_type = (
      Array.isArray($root)
    ) ? 'array'
      : (
      typeof $root === 'object'
    ) ? 'object'
      : this.#_type
  }

  // Root Alias
  #_rootAlias = 'content'
  get #rootAlias() { return this.#_rootAlias }
  set #rootAlias($rootAlias) {
    this.#_rootAlias = (
      typeof $rootAlias === 'string' &&
      $rootAlias.length > 0
    ) ? $rootAlias
      : this.#_rootAlias
  }
  // Root
  #_root = {} // []
  get #root() { return this.#_root }
  set #root($type) {
    this.#_root = (
      $type === 'array'
    ) ? []
      : {}
  }
  // Proxy
  #_proxy // Proxy
  get #proxy() { return this.#_proxy }
  set #proxy($root) {
    if(this.#_proxy) return this.#_proxy
    const $this = this
    const RootClassPropertyNames = Object.getOwnPropertyNames(
      this.#root.constructor.prototype
    )
    this.#_proxy = new Proxy(this, {
      get($target, $property, $receiver) {
        if($property === $this.#rootAlias) return $this.#root
        if(
          EventTargetClassPropertyNames.includes($property)
        ) {
          if(typeof $this[$property] === 'function') {
            return $this[$property].bind($this)
          }
          return $this[$property]
        }
        if(typeof $this.#root[$property] === 'function') {
          $this.#root[$property].bind($this.#root)
        }
        return $this.#root[$property]
      },
      set($target, $property, $value, $receiver) {
        if(typeof $value === 'object') {
          $value = new DynamicEventTarget($value, $this.#rootAlias)
          $value.addEventListener('set', function $valueAddEventListener($event) {
            const path = [$event.detail.path]
            path.unshift($property)
            const eventDetailPath = path.join('.')
            const eventDetail = {
              key: $event.detail.key,
              val: $event.detail.val,
              path: eventDetailPath,
            }
            const setEvent = new CustomEvent('set', {
              detail: eventDetail
            })
            const setPropEvent = new CustomEvent(`set:${eventDetailPath}`, {
              detail: eventDetail
            })
            $this.dispatchEvent(setEvent, $this)
            $this.dispatchEvent(setPropEvent, $this)
          })
        }
        $this.#root[$property] = $value
        if(RootClassPropertyNames.includes($property)) {
          return true
        }
        const eventDetail = {
          key: $property,
          val: $value,
          path: $property,
        }
        const setEvent = new CustomEvent('set', {
          detail: eventDetail
        })
        const setPropEvent = new CustomEvent(`set:${$property}`, {
          detail: eventDetail
        })
        $this.dispatchEvent(setEvent, $this)
        $this.dispatchEvent(setPropEvent, $this)
        return true
      },
      deleteProperty($target, $property) {
        console.log($target, $property)
        return true
      },
    })
    Object.assign(this.#_proxy, $root)
    return this.#_proxy
  }
}
