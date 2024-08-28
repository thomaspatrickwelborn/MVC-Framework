import { typeOf } from '../../../Coutil/index.js'
import DynamicEventTarget from '../index.js'
import DETEvent from '../DynamicEvent/index.js'
import Traps from './Traps/index.js'

export default class Handler {
  #aliases
  #options
  traps
  constructor($aliases, $options) {
    this.#aliases = $aliases
    this.#options = $options
    this.traps = new Traps(this.#aliases, $options.traps)
    return this
  }
  // Get Property
  get get() {
    const $this = this
    const {
      type,
      eventTarget, 
      root, 
      rootAlias, 
      basename,
      path, 
    } = this.#aliases
    return function get($target, $property, $receiver) {
      // Root Property
      if($property === rootAlias) {
        return this.proxy
      } else {
      // Event Target/Dynamic Event Target Property
      if(
        Object.getOwnPropertyNames(EventTarget.prototype)
        .includes($property) ||
        Object.getOwnPropertyNames(DynamicEventTarget.prototype)
        .includes($property) /* ||
        Object.getOwnPropertyNames(eventTarget)
        .includes($property) */
      ) {
        if(typeof eventTarget[$property] === 'function') {
          return eventTarget[$property].bind(eventTarget)
        }
        return eventTarget[$property]
      } else
      // Object Property
      if(
        Object.getOwnPropertyNames(Object)
        .includes($property)
      ) {
        return $this.traps['Object'][$property]
      } else
      // Array Property
      if(
        Object.getOwnPropertyNames(Array.prototype)
        .includes($property) ||
        Object.getOwnPropertyNames(Array)
        .includes($property)
      ) {
        return $this.traps['Array'][$property]
      } /* else 
      // Map
      if(
        type === 'map' &&
        Object.getOwnPropertyNames(Map.prototype)
        .includes($property)
      ) {
        return $this.traps['Map'][$property] || 
          $this.traps['Map']['default']
      } */
      else
        return root[$property]
      }
    }
  }
  get set() {
    const $this = this
    const {
      type,
      eventTarget, 
      root, 
      rootAlias, 
      basename,
      path, 
    } = this.#aliases
    const { merge } = this.#options.traps.object.set
    return function set($target, $property, $value, $receiver) {
      // Object Property
      if(
        Object.getOwnPropertyNames(Object)
          .includes($property)
      ) {
        $this.traps['Object'][$property] = $value
      } else
      // Array, Array Prototype Property
      if(
        Object.getOwnPropertyNames(Array.prototype)
        .includes($property) ||
        Object.getOwnPropertyNames(Array)
        .includes($property)
      ) {
        $this.traps['Array'][$property] = $value
      } else
      // Dynamic Event Target Property
      if(
        typeOf($value) === 'object' ||
        typeOf($value) === 'array' /* ||
        typeOf($value) === 'map' */
      ) {
        $value = new DynamicEventTarget(
          $value, {
            basename,
            path,
            parent: eventTarget,
            rootAlias,
          }
        )
      }
      // Property Assignment
      root[$property] = $value
      const basename = $property
      const path = (
        path !== null
      ) ? path.concat('.', $property)
        : $property
      eventTarget.dispatchEvent(
        new DETEvent(
          'set',
          {
            basename,
            path,
            detail: {
              property: $property,
              value: $value,
            },
          },
          eventTarget
        )
      )
      return true
    }
  }
  get delete() {}
}