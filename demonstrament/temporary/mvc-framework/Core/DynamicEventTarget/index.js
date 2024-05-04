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
    Object.freeze(this)
    return this.#proxy
  }
  // Aliases
  #_aliases
  get #aliases() {
    if(this.#_aliases === undefined) {
      this.#_aliases = {
        $this: this,
        $rootAlias: this.#rootAlias,
        $root: this.#root,
      }
    }
    return this.#_aliases
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
    this.#_proxy = new Proxy(this, {
      get: this.#get,
      set: this.#set,
      deleteProperty: this.#deleteProperty,
    })
    Object.assign(this.#_proxy, $root)
    return this.#_proxy
  }
  // Proxy Get
  get #get() {
    const { $this, $root, $rootAlias } = this.#aliases
    const ThisClassPropertyNames = Object.getOwnPropertyNames(
      $this.constructor.prototype
    )
    const RootClassPropertyNames = Object.getOwnPropertyNames(
      $root.constructor.prototype
    )
    return function get($target, $property, $receiver) {
      // This Class Properties (Event Target Instance)
      if(
        ThisClassPropertyNames.includes($property)
      ) {
        if(typeof $this[$property] === 'function') {
          return $this[$property].bind($this)
        }
        return $this[$property]
      }
      // Root Properties (Object, Array Instance)
      if($property === $rootAlias) return $root
      // Event Target Class Properties
      if(
        EventTargetClassPropertyNames.includes($property)
      ) {
        if(typeof $this[$property] === 'function') {
          return $this[$property].bind($this)
        }
        return $this[$property]
      }
      // Root Class Properties
      if(RootClassPropertyNames.includes($property)) {
        if(typeof $root[$property] === 'function') {
          $root[$property].bind($root)
        }
        // Array Splice
        if($property === 'splice') {
          return $this.#splice(...arguments)
        } else
        // Array Pop
        if($property === 'pop') {
          return $this.#pop(...arguments)
        } else
        // Array Shift
        if($property === 'shift') {
          return $this.#shift(...arguments)
        } else
        // Array Unshift
        if($property === 'unshift') {
          return $this.#unshift(...arguments)
        } else
        // Array Push
        if($property === 'push') {
          return $this.#push(...arguments)
        } else
        // Array Fill
        if($property === 'fill') {
          return $this.#fill(...arguments)
        }
      }
      if(typeof $root[$property] === 'function') {
        $root[$property].bind($root)
      }
      return $root[$property]
    }
  }
  // Array Length
  get #length() {
    const { $this, $root, $rootAlias } = this.#aliases
    return function length($target, $property, $value, $receiver) {
      const preterLength = $root[$property]
      const anterLength = $value
      const crement = (
        preterLength < anterLength
      ) ? 1
        : (
        preterLength > anterLength
      ) ? -1
        : 0
      const stopIndex = (
        anterLength === 0
      ) ? 0
        : anterLength - 1
      var elementIndex = (
        preterLength === 0
      ) ? 0
        : preterLength - 1
      // Decrement
      if(crement === -1) {
        while(elementIndex >= stopIndex) {
          const deleteEvent = $this.#createEvent(
            'deleteProperty', elementIndex, $root[elementIndex]
          )
          $this.dispatchEvent(deleteEvent.event, $this)
          $this.dispatchEvent(deleteEvent.propEvent, $this)
          elementIndex--
        }
      } else 
      // Increment
      if(crement === 1) {
        while(elementIndex <= stopIndex) {
          const setEvent = $this.#createEvent(
            'set', elementIndex
          )
          $this.dispatchEvent(setEvent.event, $this)
          $this.dispatchEvent(setEvent.propEvent, $this)
          elementIndex++
        }
      }
      return $value
    }
  }
  // Proxy Set
  get #set() {
    const { $this, $root, $rootAlias } = this.#aliases
    const RootClassPropertyNames = Object.getOwnPropertyNames(
      $root.constructor.prototype
    )
    // Set Root Properties
    return function set($target, $property, $value, $receiver) {
      // Property Is Root Class Property
      if(RootClassPropertyNames.includes($property)) {
        // Array Length
        if($property === 'length') {
          $root[$property] = $this.#length(...arguments)
          return true
        }
        $root[$property] = $value
        return true
      }
      // Value Is Object
      if(typeof $value === 'object') {
        // Value Is Dynamic Event Target
        $value = new DynamicEventTarget($value, $rootAlias)
        // Dynamic Event Target Delete Event
        $value.addEventListener('deleteProperty', function eventBubbleDelete($event) {
          const deleteEvent = $this.#createEventBubble(
            $event, 'deleteProperty', $property
          )
          $this.dispatchEvent(deleteEvent.event, $this)
          $this.dispatchEvent(deleteEvent.propEvent, $this)
        })
        // Dynamic Event Target Set Event
        $value.addEventListener('set', function eventBubbleSet($event) {
          const setEvent = $this.#createEventBubble(
            $event, 'set', $property
          )
          $this.dispatchEvent(setEvent.event, $this)
          $this.dispatchEvent(setEvent.propEvent, $this)
        })
      }
      $root[$property] = $value
      // Dynamic Event Target Set Event
      const setEvent = $this.#createEvent('set', $property, $value)
      $this.dispatchEvent(setEvent.event, $this)
      $this.dispatchEvent(setEvent.propEvent, $this)
      return true
    }
  }
  // Proxy Delete
  get #deleteProperty() {
    const { $this, $root, $rootAlias } = this.#aliases
    const RootClassPropertyNames = Object.getOwnPropertyNames(
      this.#root.constructor.prototype
    )
    return function deleteProperty($target, $property) {
      // Delete Property Event
      const deleteEvent = $this.#createEvent(
        'deleteProperty', $property, $this.#root[$property]
      )
      delete $root[$property]
      $this.dispatchEvent(deleteEvent.event, $this)
      $this.dispatchEvent(deleteEvent.propEvent, $this)
      return true
    }
  }
  // Root (Array) Splice
  #splice($target, $property, $receiver) {
    const { $this, $root, $rootAlias } = this.#aliases
    return function splice($startIndex, $deleteCount) {
      var deleteIndex = $startIndex
      const deleteStopIndex = $startIndex + ($deleteCount - 1)
      while(deleteIndex <= deleteStopIndex) {
        const deleteEvent = $this.#createEvent(
          'deleteProperty', deleteIndex, $root[deleteIndex]
        )
        $this.dispatchEvent(deleteEvent.event, $this)
        $this.dispatchEvent(deleteEvent.propEvent, $this)
        deleteIndex++
      }
      return $root[$property](...arguments)
    }
  }
  // Root (Array) Shift
  #shift($target, $property, $receiver) {
    const { $this, $root, $rootAlias } = this.#aliases
    return function shift() {
      const deleteIndex = 0
      const deleteEvent = $this.#createEvent(
        'deleteProperty', deleteIndex, $root[deleteIndex]
      )
      $this.dispatchEvent(deleteEvent.event, $this)
      $this.dispatchEvent(deleteEvent.propEvent, $this)
      return $root[$property](...arguments)
    }
  }
  // Root (Array) Unshift
  #unshift($target, $property, $receiver) {
    const { $this, $root, $rootAlias } = this.#aliases
    return function unshift() {
      const $arguments = [...arguments]
      var addIndex = 0
      const addStopIndex = $arguments.length - 1
      while(addIndex < addStopIndex) {
        const addValue = $arguments[addIndex]
        const setEvent = $this.#createEvent(
          'set', addIndex, addValue
        )
        $this.dispatchEvent(setEvent.event, $this)
        $this.dispatchEvent(setEvent.propEvent, $this)
        addIndex++
      }
      return $root[$property](...arguments)
    }
  }
  // Root (Array) Push
  #push($target, $property, $receiver) {
    const { $this, $root, $rootAlias } = this.#aliases
    return function push() {
      const $arguments = [...arguments]
      var addIndex = $root.length - 1
      const addStopIndex = addIndex + ($arguments.length - 1)
      while(addIndex < addStopIndex) {
        const addValue = $arguments[addIndex]
        const setEvent = $this.#createEvent(
          'set', addIndex, addValue
        )
        $this.dispatchEvent(setEvent.event, $this)
        $this.dispatchEvent(setEvent.propEvent, $this)
        addIndex++
      }
      return $root[$property](...arguments)
    }
  }
  // Root (Array) Pop
  #pop($target, $property, $receiver) {
    const { $this, $root, $rootAlias } = this.#aliases
    return function pop() {
      const deleteIndex = $root.length - 1
      const deleteEvent = $this.#createEvent(
        'deleteProperty', deleteIndex, $root[deleteIndex]
      )
      $this.dispatchEvent(deleteEvent.event, $this)
      $this.dispatchEvent(deleteEvent.propEvent, $this)
      return $root[$property](...arguments)
    }
  }
  // Root (Array) Fill
  #fill($target, $property, $receiver) {
    const { $this, $root, $rootAlias } = this.#aliases
    return function fill($value, $start, $end) {
      $start = $start || 0
      $end = $end || $start + ($root.length - 1)
      var addIndex = $start
      while(addIndex <= $end) {
        const setEvent = $this.#createEvent(
          'set', addIndex, $value
        )
        $this.dispatchEvent(setEvent.event, $this)
        $this.dispatchEvent(setEvent.propEvent, $this)
        addIndex++
      }
      return $root[$property](...arguments)
    }
  }
  // Create Event Bubble
  #createEventBubble($event, $eventType, $property) {
    const path = [$event.detail.path]
    path.unshift($property)
    const eventDetailPath = path.join('.')
    const eventDetail = {
      key: $event.detail.key,
      val: $event.detail.val,
      path: eventDetailPath,
    }
    const event = new CustomEvent($eventType, {
      detail: eventDetail
    })
    const propEvent = new CustomEvent(`${$eventType}:${eventDetailPath}`, {
      detail: eventDetail
    })
    return {
      eventType: $eventType, 
      event, 
      propEvent, 
    }
  } 
  // Create Event
  #createEvent($eventType, $property, $value) {
    if(typeof $property === 'number') $property = String($property)
    if($value instanceof DynamicEventTarget) $value = $value.toObject()
    const eventDetail = {
      key: $property,
      val: $value,
      path: $property,
    }
    const event = new CustomEvent($eventType, {
      detail: eventDetail
    })
    const propEvent = new CustomEvent(`${$eventType}:${$property}`, {
      detail: eventDetail
    })
    return {
      eventType: $eventType, 
      event, 
      propEvent, 
      value: $value,
    }
  }
  // To Object
  toObject() {
    var object
    // Array
    if(this.#type === 'array') {
      object = []
      for(const $property of this.#root) {
        if($property instanceof DynamicEventTarget) {
          object.push($property.toObject())
        } else {
          object.push($property)
        }
      }
    } else
    // Object
    if(this.#type === 'object') {
      object = {}
      for(const [
        $propertyKey, $propertyValue
      ] of Object.entries(this.#root)) {
        if($propertyValue instanceof DynamicEventTarget) {
          object[$propertyKey] = $propertyValue.toObject()
        } else {
          object[$propertyKey] = $propertyValue
        }
      }
    }
    return object
  }
}
