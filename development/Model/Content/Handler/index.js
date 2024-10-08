import { typeOf } from '../../../Coutil/index.js'
import Content from '../index.js'
import { ContentEvent, ValidatorEvent } from '../Events/index.js'
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
      eventTarget, 
      root, 
      schema,
      basename,
      path,
    } = this.#settings
    return function get($target, $property, $receiver) {
      // ------------
      // Get Function
      // ------------
      if($property === 'get') { return function get($key) {
        return root[$key]
      } }
      // ------------
      // Set Function
      // ------------
      else if($property === 'set') { return function set($key, $val) {
        if(enableValidation) {
          const validValue = schema.validateProperty($property, $value)
          if(validationEvents) {
            eventTarget.dispatchEvent(
              new ValidatorEvent('validateProperty', {
                basename,
                path,
                detail: validValue,
              }, eventTarget)
            )
          }
          if(!validValue.valid) { return false }
        }
        // Dynamic Event Target Property
        if(typeof $value === 'object') {
          let subschema
          switch(schema.contextType) {
            case 'array': subschema = schema.context[0]; break
            case 'object': subschema = schema.context[$property]; break
          }
          $value = new Content($value, {
            basename,
            parent: eventTarget,
            path,
          }, subschema)
          root[$property] = $value
        }
        else {
          root[$property] = $value
        }
        const _basename = $property
        const _path = (path !== null)
          ? path.concat('.', $property)
          : $property
        eventTarget.dispatchEvent(
          new ContentEvent('set', {
            basename: _basename,
            path: _path,
            detail: {
              property: $property,
              value: $value,
            },
          }, eventTarget)
        )
        return root[$key]
      } }
      // ---------------
      // Delete Function
      // ---------------
      else if($property === 'delete') { return function deleteProperty($key) {
        return delete root[$key]
      } }
      // ------------------------------------------
      // Event Target/Dynamic Event Target Property
      // ------------------------------------------
      else if(this.#isEventTargetOrContentProperty($property)) {
        if(typeof eventTarget[$property] === 'function') {
          return eventTarget[$property].bind(eventTarget)
        }
        return eventTarget[$property]
      }
      // ------------
      // Object Traps
      // ------------
      else if(this.#isObjectProperty($property)) {
        return $this.traps['Object'][$property]
      }
      // -----------
      // Array Traps
      // -----------
      else if(this.#isArrayProperty($property)) {
        return $this.traps['Array'][$property]
      }
      // ---------
      // Undefined
      // ---------
      else { return undefined }
    }
  }
  // Set Property
  get set() {
    const $this = this
    const { schema } = this.#settings
    const { enableValidation, validationEvents } = schema.options
    return function set($target, $property, $value, $receiver) {
      if(this.#isObjectProperty($property)) {
        $this.traps['Object'][$property] = $value
      }
      else if(this.#isArrayProperty($property)) {
        $this.traps['Array'][$property] = $value
      }
      return true
    }
  }
  get deleteProperty() {
    return function deleteProperty($target, $property) { return true }
  }
  #isContentProperty($property) {
    return Object.getOwnPropertyNames(Content.prototype)
    .includes($property)
  }
  #isEventTarget($property) {
    return Object.getOwnPropertyNames(EventTarget.prototype)
    .includes($property)
    
  }
  #isEventTargetOrContentProperty($property) {
    return (
      this.#isEventTarget($property) ||
      this.#isContentProperty($property)
    )
  }
  #isObjectProperty($property) {
    return Object.getOwnPropertyNames(Object)
    .includes($property)
  }
  #isArrayProperty($property) {
    return (
      Object.getOwnPropertyNames(Array.prototype)
      .includes($property) ||
      Object.getOwnPropertyNames(Array)
      .includes($property)
    )
  }
  #isFunctionProperty($property) {
    return Object.getOwnPropertyNames(Function.prototype)
    .includes($property)
  }
}