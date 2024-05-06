import ObjectTrap from './ObjectTrap/index.js'
import ArrayTrap from './ArrayTrap/index.js'
const EventTargetClassPropertyNames = Object.getOwnPropertyNames(EventTarget.prototype)
const ArrayClassPropertyNames = Object.getOwnPropertyNames(Array.prototype)
const ObjectClassPropertyNames = Object.getOwnPropertyNames(Object.prototype)
const DynamicEventTargetNames = ['get', 'set', 'deleteProperty', 'toObject']

export default class Handler {
  constructor($aliases) {
    this.#aliases = $aliases
    this.#objectTrap = new ObjectTrap(this.#aliases)
    console.log(this.#objectTrap)
  }
  #aliases
  #objectTrap
  // Get
  get #get() {
    /*
    const { $this, $root, $rootAlias } = this.#aliases
    const RootClassPropertyNames = Object.getOwnPropertyNames(
      $root.constructor.prototype
    )
    return function get($target, $property, $receiver) {
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
    */
  }
  // Set
  get #set() {
    /*
    const { $this, $root, $rootAlias } = this.#aliases
    const RootClassPropertyNames = Object.getOwnPropertyNames(
      $root.constructor.prototype
    )
    // Set Root Properties
    return function set($target, $property, $value, $receiver) {
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
    */
  }
  // Delete
  get #deleteProperty() {
    /*
    const { $this, $root, $rootAlias } = this.#aliases
    return function deleteProperty($target, $property) {
      // Delete Property Event
      const deleteEvent = $this.#createEvent(
        'deleteProperty', $property, $root[$property]
      )
      delete $root[$property]
      $this.dispatchEvent(deleteEvent.event, $this)
      $this.dispatchEvent(deleteEvent.propEvent, $this)
      return true
    }
    */
  }
}