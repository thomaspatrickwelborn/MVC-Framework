import DynamicEventTarget from '../index.js'
import Traps from './Traps/index.js'

export default class Handler {
  constructor($aliases) {
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
      if(
        // 2. Event Target Class Instance Methods
        Object.getOwnPropertyNames(EventTarget.prototype)
        .includes($property) ||
        // 3. Dynamic Event Target Class Instance Methods
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
      // 4. Type Object
      if(
        $type === 'object'
      ) {
        if(
          Object.getOwnPropertyNames(Object)
          .includes($property)
        ) {
          return $this.traps['Object'][$property]
        } else
        if(
          Object.getOwnPropertyNames(Array.prototype)
          .includes($property) ||
          Object.getOwnPropertyNames(Array)
          .includes($property)
        ) {
          return $this.traps['Array'][$property]
        }
      } 
      // 5. Type Array
      if(
        $type === 'array'
      ) {
        if(
          Object.getOwnPropertyNames(Array.prototype)
          .includes($property) ||
          Object.getOwnPropertyNames(Array)
          .includes($property)
        ) {
          return $this.traps['Array'][$property]
        } else
        if(
          Object.getOwnPropertyNames(Object)
          .includes($property)
        ) {
          return $this.traps['Object'][$property]
        }
      }
      // 8. Map Class Instance Property Trap
      if(
        $type === 'map' &&
        Object.getOwnPropertyNames(Map.prototype)
        .includes($property)
      ) return $this.traps['Map'][$property] || 
        $this.traps['Map']['default']
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
        $type === 'object'
      ) {
        if(
          Object.getOwnPropertyNames(Object)
          .includes($property)
        ) {
          $this.traps['Object'][$property] = $value
        } else
        if(
          Object.getOwnPropertyNames(Array.prototype)
          .includes($property) ||
          Object.getOwnPropertyNames(Array)
          .includes($property)
        ) {
          $this.traps['Array'][$property] = $value
        }
      } else
      if(
        $type === 'array'
      ) {
        if(
          Object.getOwnPropertyNames(Array.prototype)
          .includes($property) ||
          Object.getOwnPropertyNames(Array)
          .includes($property)
        ) {
          $this.traps['Array'][$property] = $value
        } else if(
          Object.getOwnPropertyNames(Object)
          .includes($property)
        ) {
          $this.traps['Object'][$property] = $value
        }
      }
      return true
    }
  }
  get deleteProperty() {
    return function deleteProperty($target, $property) {
      return true
    }
  }
}