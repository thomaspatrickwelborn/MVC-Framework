const EventTargetClassPropertyNames = Object.getOwnPropertyNames(EventTarget.prototype)
const ArrayClassPropertyNames = Object.getOwnPropertyNames(Array.prototype)
const ObjectClassPropertyNames = Object.getOwnPropertyNames(Object.prototype)
const DynamicEventTargetNames = ['get', 'set', 'deleteProperty', 'toObject']

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
    if(this.#_aliases !== undefined) return this.#_aliases
    this.#_aliases = {
      $this: this,
      $rootAlias: this.#_rootAlias,
      $root: this.#_root,
      $proxy: this.#_proxy,
    }
    return this.#_aliases
  }
  // Type
  #_type // = 'object' // 'array'
  get #type() { return this.#_type }
  set #type($root) {
    if(this.#_type !== undefined) return
    this.#_type = (
      Array.isArray($root)
    ) ? 'array'
      : 'object'
  }
  // Root Alias
  #_rootAlias
  get #rootAlias() { return this.#_rootAlias }
  set #rootAlias($rootAlias) {
    if(this.#_rootAlias !== undefined) return
    this.#_rootAlias = (
      typeof $rootAlias === 'string' &&
      $rootAlias.length > 0
    ) ? $rootAlias
      : 'content'
  }
  // Root
  #_root = {} // []
  get #root() {
    var root
    // Root Array
    if(this.#type === 'array') {
      root = []
      for(const $property of this.#_root) {
        if($property instanceof DynamicEventTarget) {
          root.push($property[this.#rootAlias])
        } else {
          root.push($property)
        }
      }
    } else
    // Root Object
    if(this.#type === 'object') {
      root = {}
      for(const [
        $propertyKey, $propertyValue
      ] of Object.entries(this.#_root)) {
        if($propertyValue instanceof DynamicEventTarget) {
          root[$propertyKey] = $propertyValue[this.#rootAlias]
        } else {
          root[$propertyKey] = $propertyValue
        }
      }
    }
    // Object.seal(root)
    return root
  }
  set #root($type) {
    if(this.#_root !== undefined) return
    this.#_root = (
      $type === 'array'
    ) ? []
      : {}
  }
  // Proxy
  #_proxy // Proxy
  get #proxy() { return this.#_proxy }
  set #proxy($root) {
    if(this.#_proxy !== undefined) return
    this.#_proxy = new Proxy(this, this.#handler)
    Object.assign(this.#_proxy, $root)
    Object.freeze(this.#_proxy)
  }
  // Handler
  #_handler
  get #handler() {
    if(this.#_handler !== undefined) return this.#_handler
    this.#_handler = {
      get: this.#getHandler,
      set: this.#setHandler,
      deleteProperty: this.#deletePropertyHandler,
    }
    return this.#_handler
  }
  // Proxy Get
  get #getHandler() {
    const { $this, $root, $rootAlias } = this.#aliases
    const RootClassPropertyNames = Object.getOwnPropertyNames(
      $root.constructor.prototype
    )
    return function getHandler($target, $property, $receiver) {
      // Root Properties (Object Instance, Array Instance)
      if($property === $rootAlias) return $this.#root
      // Event Target Class Properties
      if(
        EventTargetClassPropertyNames.includes($property)
      ) {
        if(typeof $this[$property] === 'function') {
          return $this[$property].bind($this)
        }
        return $this[$property]
      }
      if(
        DynamicEventTargetNames.includes($property)
      ) {
        // Object Get
        if($property === 'get') return $this.#get(...arguments)
        // Object Set
        if($property === 'set') return $this.#set(...arguments)
        // Object DeleteProperty
        if($property === 'deleteProperty') return $this.#deleteProperty(...arguments)
        // Object To Object
        if($property === 'toObject') return $this.#toObject(...arguments)
      }
      // Root Class Properties
      if(RootClassPropertyNames.includes($property)) {
        // Array Splice
        if($property === 'splice') return $this.#splice(...arguments)
        // Array Pop
        if($property === 'pop') return $this.#pop(...arguments)
        // Array Shift
        if($property === 'shift') return $this.#shift(...arguments)
        // Array Unshift
        if($property === 'unshift') return $this.#unshift(...arguments)
        // Array Push
        if($property === 'push') return $this.#push(...arguments)
        // Array Fill
        if($property === 'fill') return $this.#fill(...arguments)
        // Default
        if(typeof $root[$property] === 'function') {
          $root[$property].bind($root)
        }
        return $root[$property]
      }
      return undefined
    }
  }
  // Proxy Set
  get #setHandler() {
    const { $this, $root, $rootAlias } = this.#aliases
    const RootClassPropertyNames = Object.getOwnPropertyNames(
      $root.constructor.prototype
    )
    // Set Root Properties
    return function setHandler($target, $property, $value, $receiver) {
      // Property Is Root
      if($property === $rootAlias) {
        // Value Is Object
        return true
      }
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
      return true
    }
  }
  // Proxy Delete
  get #deletePropertyHandler() {
    const { $this, $root, $rootAlias } = this.#aliases
    return function deletePropertyHandler($target, $property) {
      // Delete Property Event
      const deleteEvent = $this.#createEvent(
        'deleteProperty', $property, $root[$property]
      )
      delete $root[$property]
      $this.dispatchEvent(deleteEvent.event, $this)
      $this.dispatchEvent(deleteEvent.propEvent, $this)
      return true
    }
  }
  // Root (Object) Get
  #get($target, $property, $receiver) {
    const { $this, $root, $rootAlias, $proxy } = this.#aliases
    return function get() {
      const $arguments = [...arguments]
      // Get Object
      if($arguments.length === 0) {
        return $root
      } else
      // Get Property
      if($arguments.length === 1) {
        const property = $arguments[0]
        return $root[property]
      }
    }
  }
  // Root (Object) Set
  #set($target, $property, $receiver) {
    const { $this, $root, $rootAlias } = this.#aliases
    return function set($property, $value) {
      if(typeof $value === 'object') {
        // Value Is Dynamic Event Target
        $value = new DynamicEventTarget($value, $rootAlias)
        // Dynamic Event Target Delete Event
        $value.addEventListener('deleteProperty', function eventBubbleDelete($event) {
          const deleteEvent = $this.#createBubbleEvent(
            $event, 'deleteProperty', $property
          )
          $this.dispatchEvent(deleteEvent.event, $this)
          $this.dispatchEvent(deleteEvent.propEvent, $this)
        })
        // Dynamic Event Target Set Event
        $value.addEventListener('set', function eventBubbleSet($event) {
          const setEvent = $this.#createBubbleEvent(
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
      $root[$property] = $value
      return $root
    }
  }
  // Root (Object) Delete Property
  #deleteProperty($target, $property, $receiver) {
    const { $this, $root, $rootAlias } = this.#aliases
    return function deleteProperty() {
      const $arguments = [...arguments]
      if($arguments.length === 0) {
        for(const [
          $deletePropKey, $deletePropVal
        ] of Object.entries($root)) {
          // 
          delete $root[$deletePropKey]
        }
      } else
      if($arguments.length === 1) {
        // 
        delete $root[$property]
      }
      const deletePropertyEvent = $this.#createEvent('delete', $property, $value)
      $this.dispatchEvent(deletePropertyEvent.event, $this)
      $this.dispatchEvent(deletePropertyEvent.propEvent, $this)
      delete this[$rootAlias][$property]
      return true
    }
  }
  // Root (Array) Length
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
      const addStopIndex = (
        $arguments.length === 0
      ) ? 0
        : $arguments.length - 1
      while(addIndex <= addStopIndex) {
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
      var addIndex = (
        $root.length === 0
      ) ? 0 
        : $root.length - 1
      const addStopIndex = addIndex + $arguments.length
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
  #createBubbleEvent($event, $eventType, $property) {
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
    if($value instanceof DynamicEventTarget) $value = $value[this.#rootAlias]
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
  #toObject() {
    var object
    // Array
    if(this.#type === 'array') {
      object = []
      for(const $property of this.#root) {
        if($property instanceof DynamicEventTarget) {
          object.push($property[this.#rootAlias])
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
          object[$propertyKey] = $propertyValue[this.#rootAlias]
        } else {
          object[$propertyKey] = $propertyValue
        }
      }
    }
    return object
  }
}
