import DynamicEventTarget from '../index.js'
import Properties from './Properties/index.js'
import {
  ObjectTrap, ArrayTrap, MapTrap
} from './Traps/index.js'

export default class Handler {
  constructor($aliases) {
    this.#aliases = $aliases
    this.objectTrap = new ObjectTrap(this.#aliases)
    this.arrayTrap = new ArrayTrap(this.#aliases)
    this.mapTrap = new MapTrap(this.#aliases)
  }
  #aliases
  objectTrap
  arrayTrap
  mapTrap
  #getRoot($target, $property, $receiver) {
    const { $eventTarget, $root, $rootAlias, $type } = this.#aliases
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
  // Get
  get get() {
    const { $eventTarget, $root, $rootAlias, $type } = this.#aliases
    return function get($target, $property, $receiver) {
      // 1. Root Alias Property
      if($property === $rootAlias) {
        return this.#getRoot(...arguments)
      }
      // 2. Event Target Class Properties
      if(Properties.EventTarget.Names.includes($property)) {
        if(typeof $eventTarget[$property] === 'function') {
          return $eventTarget[$property].bind($eventTarget)
        }
        return $eventTarget[$property]
      }
      // 3. Object Class Property Traps
      if(Properties.Object.Names.includes($property)) {
        // Object Class Property Traps
        if(Properties.Object.TrapNames.includes($property)) {
          return this.objectTrap[$property](...arguments)
        }
      }
      // 4. Array Class Property
      if(Properties.Array.Names.includes($property)) {
        // Array Class Property Traps
        if(Properties.Array.TrapNames.includes($property)) {
          return this.arrayTrap[$property](...arguments)
        }
        if($property === 'length') {
          return $root[$property]
        }
      }
      // 5. Root Property
      return $root[$property]
    }
  }
  // Set
  get set() {
    const { $eventTarget, $root, $rootAlias } = this.#aliases
    // Set Root Properties
    return function set($target, $property, $value, $receiver) {
      // Array Class Property
      if(Properties.Array.Names.includes($property)) {
        if($property === 'length') {
          $root[$property] = $value
          return true
        }
        $root[$property] = $value
        return true
      }
      return true
    }
  }
}