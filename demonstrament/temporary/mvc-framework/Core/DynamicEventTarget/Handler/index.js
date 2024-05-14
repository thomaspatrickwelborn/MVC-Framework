import DynamicEventTarget from '../index.js'
import Traps from './Traps/index.js'

export default class Handler {
  constructor($aliases, $options) {
    this.#aliases = $aliases
    this.traps = new Traps(this.#aliases)
    return this
  }
  #aliases
  traps
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
        .includes($property) /* ||
        Object.getOwnPropertyNames($eventTarget)
        .includes($property) */
      ) {
        if(typeof $eventTarget[$property] === 'function') {
          return $eventTarget[$property].bind($eventTarget)
        }
        return $eventTarget[$property]
      }
      // 4. Object Class Property Trap
      if(
        $type === 'object' &&
        Object.getOwnPropertyNames(Object)
        .includes($property)
      ) return $this.traps['Object'][$property]
      // 5. Array Class Instance Property Trap
      if(
        $type === 'array' &&
        Object.getOwnPropertyNames(Array.prototype)
        .includes($property)
      ) return $this.traps['Array'][$property]
      // 6. Object/Array Intermix
      if(
        $type === 'array' &&
        Object.getOwnPropertyNames(Object.prototype)
        .includes($property)
      ) return $this.traps['Object'][$property]
      // 7. Map Class Instance Property Trap
      if(
        $type === 'map' &&
        Object.getOwnPropertyNames(Map.prototype)
        .includes($property)
      ) return $this.traps['Map'][$property]
      return undefined
    }
  }
  get set() {
    const $this = this
    const {
      $eventTarget, $root, $rootAlias, $type, $proxy
    } = this.#aliases
    return function set($target, $property, $value) {
      if(
        $type === 'array' &&
        Object.getOwnPropertyNames(Array.prototype)
        .includes($property)
      ) $this.traps['Array'][$property] = $value
      // 6. Object/Array Intermix
      if(
        $type === 'array' &&
        Object.getOwnPropertyNames(Object.prototype)
        .includes($property)
      ) $this.traps['Object'][$property] = $value
      return true
    }
  }
  // get deleteProperty() {
  //   return function deleteProperty($target, $property) {
  //     return true
  //   }
  // }
}