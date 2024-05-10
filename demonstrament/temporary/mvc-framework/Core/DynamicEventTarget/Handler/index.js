import DynamicEventTarget from '../index.js'
import {
  ObjectTrap, ArrayTrap, MapTrap
} from './Traps/index.js'

export default class Handler {
  constructor($aliases) {
    this.#aliases = $aliases
    this.objectTrap = new ObjectTrap(this.#aliases)
    this.arrayTrap = new ArrayTrap(this.#aliases)
  }
  #aliases
  objectTrap
  arrayTrap
  // Get
  get get() {
    const $this = this
    const {
      $eventTarget, $root, $rootAlias, $type, $proxy
    } = this.#aliases
    return function get($target, $property, $receiver) {
      // 1. Root Alias Property
      if($property === $rootAlias) return $root
      // 2. Event Target Class Instance Methods
      // 3. Dynamic Event Target Class Instance Methods
      if(
        Object.getOwnPropertyNames(EventTarget.prototype)
        .includes($property) ||
        Object.getOwnPropertyNames(DynamicEventTarget.prototype)
        .includes($property) ||
        Object.getOwnPropertyNames($eventTarget)
        .includes($property)
      ) {
        if(typeof $eventTarget[$property] === 'function') {
          return $eventTarget[$property].bind($eventTarget)
        }
        return $eventTarget[$property]
      }
      // 4. Object Class Property Trap
      if(
        Object.getOwnPropertyNames(Object)
        .includes($property)
      ) return $this.objectTrap[$property]
      // 5. Array Class Instance Property Trap
      if(
        Object.getOwnPropertyNames(Array.prototype)
        .includes($property)
      ) return $this.arrayTrap[$property]
      return undefined
    }
  }
  // get set() {
  //   return function set($target, $property, $value) {
  //     return true
  //   }
  // }
  // get deleteProperty() {
  //   return function deleteProperty($target, $property) {
  //     return true
  //   }
  // }
}