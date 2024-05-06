import ObjectTrap from './ObjectTrap/index.js'
import ArrayTrap from './ArrayTrap/index.js'
const EventTargetClassPropertyNames = Object.getOwnPropertyNames(EventTarget.prototype)
const ArrayClassPropertyNames = Object.getOwnPropertyNames(Array.prototype)
const MapClassPropertyNames = Object.getOwnPropertyNames(Map.prototype)
const ObjectClassPropertyNames = Object.getOwnPropertyNames(Object.prototype)
const DynamicEventTargetNames = ['get', 'set', 'delete', 'toObject']

export default class Handler {
  constructor($aliases) {
    this.#aliases = $aliases
    this.#objectTrap = new ObjectTrap(this.#aliases)
    this.#arrayTrap = new ArrayTrap(this.#aliases)
  }
  #aliases
  #objectTrap
  #arrayTrap
  // Get
  get get() {
    const { $eventTarget, $root, $rootAlias } = this.#aliases
    const RootClassPropertyNames = Object.getOwnPropertyNames(
      $root.constructor.prototype
    )
    return function get($target, $property, $receiver) {
      // Root Properties (Object Instance, Array Instance)
      if($property === $rootAlias) return $root
      // Event Target Class Properties
      if(
        EventTargetClassPropertyNames.includes($property)
      ) {
        if(typeof $eventTarget[$property] === 'function') {
          return $eventTarget[$property].bind($eventTarget)
        }
        return $eventTarget[$property]
      }
      // Object Class Properties (Use Map Class Property Names)
      // After initial implementation differentiate between 
      // Map and Object Class Property Names
      if(
        MapClassPropertyNames.includes($property)
      ) {
        // Object Get
        if($property === 'get') return this.#objectTrap.get(...arguments)
        // Object Set
        if($property === 'set') return this.#objectTrap.set(...arguments)
        // Object DeleteProperty
        if($property === 'delete') return this.#objectTrap.delete(...arguments)
        // Object To Object
        if($property === 'toObject') return this.#objectTrap.toObject(...arguments)
      }
      // Array Class Properties
      if(ArrayClassPropertyNames.includes($property)) {
        // Array Splice
        if($property === 'splice') return this.#arrayTrap.splice(...arguments)
        // Array Pop
        if($property === 'pop') return this.#arrayTrap.pop(...arguments)
        // Array Shift
        if($property === 'shift') return this.#arrayTrap.shift(...arguments)
        // Array Unshift
        if($property === 'unshift') return this.#arrayTrap.unshift(...arguments)
        // Array Push
        if($property === 'push') return this.#arrayTrap.push(...arguments)
        // Array Fill
        if($property === 'fill') return this.#arrayTrap.fill(...arguments)
      }
      return undefined
    }
  }
  // Set
  get set() {
    const { $eventTarget, $root, $rootAlias } = this.#aliases
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
      // Array Class Property
      if(RootClassPropertyNames.includes($property)) {
        // Array Length
        if($property === 'length') {
          $root[$property] = this.#arrayTrap.length(...arguments)
          return true
        }
        $root[$property] = $value
        return true
      }
      return true
    }
  }
}