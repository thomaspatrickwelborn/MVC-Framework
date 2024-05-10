import DynamicEventTarget from '../index.js'
import {
  ObjectTrap, ArrayTrap, MapTrap
} from './Traps/index.js'

export default class Handler {
  constructor($aliases) {
    this.#aliases = $aliases
    this.objectTrap = new ObjectTrap(this.#aliases)
    this.arrayTrap = new ArrayTrap(this.#aliases)
    // this.mapTrap = new MapTrap(this.#aliases)
  }
  #aliases
  objectTrap
  arrayTrap
  // mapTrap
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
    const { $eventTarget, $root, $rootAlias, $type, $proxy } = this.#aliases
    const $this = this
    return function get($target, $property, $receiver) {
      // 1. Root Alias Property
      if($property === $rootAlias) {
        return $root
      }
      // 2. Event Target Class Properties
      if(
        Object.getOwnPropertyNames(EventTarget.prototype)
        .includes($property)
      ) {
        if(typeof $eventTarget[$property] === 'function') {
          return $eventTarget[$property].bind($eventTarget)
        }
        return $eventTarget[$property]
      }
      // 3. Object Class Property Traps
      if(
        $type === 'object' &&
        Object.getOwnPropertyNames(Object)
        .includes($property)
      ) {
        return $this.objectTrap[$property]
      }
      // 4. Array Class Property
      if(
        $type === 'array' &&
        Object.getOwnPropertyNames(Array.prototype)
        .includes($property)
      ) {
        return $this.arrayTrap[$property]
      }
      // 5. Root Property
      return $root[$property]
    }
  }
  // Set
  get set() {
    const $this = this
    const { $eventTarget, $root, $rootAlias } = this.#aliases
    return function set($target, $property, $value, $receiver) {
      $root[$property] = $value
      return true
    }
  }
  // Delete
  get delete() {
    const $this = this
    const { $eventTarget, $root, $rootAlias, $type, $proxy } = this.#aliases
    return function deleteProperty($target, $property) {
      delete $root[$property]
      return true
    }
  }
}