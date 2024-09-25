import { typeOf } from '../../Coutil/index.js'
import Model from '../index.js'
import ModelEvent from '../ModelEvent/index.js'
import Traps from './Traps/index.js'

export default class Handler {
  #settings
  #options
  traps
  constructor($settings, $options) {
    this.#settings = $settings
    this.#options = $options
    this.traps = new Traps(this.#settings, $options.traps)
    return this
  }
  // Get Property
  get get() {
    const $this = this
    const {
      basename,
      eventTarget, 
      path, 
      root, 
      rootAlias, 
    } = this.#settings
    return function get($target, $property, $receiver) {
      // Root Property
      if(this.#isRootProperty($property)) {
        return this.proxy
      } else
      // Event Target/Dynamic Event Target Property
      if(this.#isEventTargetOrModelProperty($property)) {
        if(typeof eventTarget[$property] === 'function') {
          return eventTarget[$property].bind(eventTarget)
        }
        return eventTarget[$property]
      } else  
      // Object Property Traps
      if(this.#isObjectProperty($property)) {
        return $this.traps['Object'][$property] || root[$property]
      } else
      // Array Property Traps
      if(this.#isArrayProperty($property)) {
        return $this.traps['Array'][$property] || root[$property]
      }
      // Root Property
      else {
        return root[$property]
      }
    }
  }
  get set() {
    const $this = this
    const {
      eventTarget, 
      root, 
      rootAlias, 
    } = this.#settings
    let {
      basename,
      path,
    } = this.#settings
    const { merge } = this.#options.traps.properties.set
    return function set($target, $property, $value, $receiver) {
      // Object Property
      if(this.#isObjectProperty($property)) {
        $this.traps['Object'][$property] = $value
      } else
      // Array, Array Prototype Property
      if(this.#isArrayProperty($property)) {
        $this.traps['Array'][$property] = $value
      } else
      // Dynamic Event Target Property
      if(typeof $value === 'object') {
        $value = new Model(
          {
            content: $value
          }, {
            basename,
            parent: eventTarget,
            path,
            rootAlias,
          }
        )
      }
      // Property Assignment
      root[$property] = $value
      basename = $property
      path = (
        path !== null
      ) ? path.concat('.', $property)
        : $property
      eventTarget.dispatchEvent(
        new ModelEvent(
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
  get deleteProperty() {
    const $this = this
    const {
      eventTarget, 
      root, 
      rootAlias, 
    } = this.#settings
    let {
      basename,
      path,
    } = this.#settings
    const { merge } = this.#options.traps.properties.set
    return function deleteProperty($target, $property) {
      delete root[$property]
      eventTarget.dispatchEvent(
        new ModelEvent(
          'delete',
          {
            basename,
            path,
            detail: {
              property: $property
            },
          },
          eventTarget
        )
      )
      return true
    }
  }
  #isRootProperty($property) {
    return ($property === this.#settings.rootAlias)
  }
  #isModelProperty($property) {
    return (
      (
        Object.getOwnPropertyNames(EventTarget.prototype)
        .includes($property) ||
        Object.getOwnPropertyNames(Model.prototype)
        .includes($property)
      )
    )
  }
  #isEventTarget($property) {
    return (
      (
        Object.getOwnPropertyNames(EventTarget.prototype)
        .includes($property) ||
        Object.getOwnPropertyNames(Model.prototype)
        .includes($property)
      )
    )
  }
  #isEventTargetOrModelProperty($property) {
    return (
      (
        this.#isEventTarget($property) ||
        this.#isModelProperty($property)
      )
    )
  }
  #isObjectProperty($property) {
    return (
      (
        Object.getOwnPropertyNames(Object)
        .includes($property)
      )
    )
  }
  #isArrayProperty($property) {
    return (
      (
        Object.getOwnPropertyNames(Array.prototype)
        .includes($property) ||
        Object.getOwnPropertyNames(Array)
        .includes($property)
      )
    )
  }
  #isFunctionProperty($property) {
    return (
      Object.getOwnPropertyNames(Function.prototype)
      .includes($property)
    )
  }
}