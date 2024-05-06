import DynamicEventTarget from '../index.js'
import ObjectTrap from './ObjectTrap/index.js'
import ArrayTrap from './ArrayTrap/index.js'
import MapTrap from './MapTrap/index.js'
// Event Class Properties
const EventTargetClassPropertyNames = Object.getOwnPropertyNames(
  EventTarget.prototype
)
const EventTargetClassPropertyTrapNames = [
  'addEventListener', 'removeEventListener', 'dispatchEvent'
]
// Object Class Properties
const ObjectClassPropertyNames = Object.getOwnPropertyNames(
  Object
)
const ObjectClassPropertyTrapNames = [
  'assign', 'defineProperties', 'defineProperty',
  'create', 'entries', 'freeze', 'fromEntries',
  'getOwnPropertyDescriptor', 'getOwnPropertyDescriptors', 
  'getOwnPropertyNames', 'getOwnPropertySymbols', 
  'getPrototypeOf', 'hasOwn', 'is', 'isExtensible', 
  'isFrozen', 'isSealed', 'keys', 'preventExtensions', 
  'seal', 'setPrototypeOf', 'values',
]
// Array Class Properties
const ArrayClassPropertyNames = Object.getOwnPropertyNames(
  Array.prototype
)
const ArrayClassPropertyTrapNames = [
  'splice', 'pop', 'shift', 'unshift', 'push', 'fill'
]
// Map Class Properties
const MapClassPropertyNames = Object.getOwnPropertyNames(
  Map.prototype
)
const MapClassPropertyTrapNames = [
  'get', 'set', 'delete', 'toObject'
]

export default class Handler {
  constructor($aliases) {
    this.#aliases = $aliases
    this.objectTrap = new ObjectTrap(this.#aliases)
    this.arrayTrap = new ArrayTrap(this.#aliases)
    this.mapTrap = new MapTrap(this.#aliases)
  }
  #aliases
  objectTrap
  mapTrap
  // Get
  get get() {
    const { $eventTarget, $root, $rootAlias, $type } = this.#aliases
    const RootClassPropertyNames = Object.getOwnPropertyNames(
      $root.constructor.prototype
    )
    return function get($target, $property, $receiver) {
      // Root Property
      if($property === $rootAlias) {
        var root = (
          $type === 'array'
        ) ? []
          : (
          $type === 'object'
        ) ? {}
          : {}
        for(var [
          $propertyKey, $propertyValue
        ] of Object.entries($root)) {
          if($propertyValue instanceof DynamicEventTarget) {
            $propertyValue = $propertyValue[$rootAlias]
          }
          root[$propertyKey] = $propertyValue
        }
        return root
      }
      // Event Target Class Properties
      if(
        EventTargetClassPropertyNames.includes($property)
      ) {
        if(typeof $eventTarget[$property] === 'function') {
          return $eventTarget[$property].bind($eventTarget)
        }
        return $eventTarget[$property]
      }
      // Object Class Property Traps
      if(
        ObjectClassPropertyNames.includes($property) &&
        ObjectClassPropertyTrapNames.includes($property)
      ) return this.objectTrap[$property](...arguments)
      // Array Class Property Traps
      if(
        ArrayClassPropertyNames.includes($property) &&
        ArrayClassPropertyTrapNames.includes($property)
      ) return this.arrayTrap[$property](...arguments)
      // Map Class Property Traps
      if(
        MapClassPropertyNames.includes($property) &&
        MapClassPropertyTrapNames.includes($property)
      ) return this.objectTrap[$property](...arguments)
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
          $root[$property] = this.arrayTrap.length(...arguments)
          return true
        }
        $root[$property] = $value
        return true
      }
      return true
    }
  }
}