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
      basename,
      eventTarget,
      path,
      root,
      schema,
    } = this.#settings
    return function get($target, $property, $receiver) {
      // Event Target/Dynamic Event Target Property
      if(this.#isEventTargetOrContentProperty($property)) {
        if(typeof eventTarget[$property] === 'function') {
          return eventTarget[$property].bind(eventTarget)
        }
        return eventTarget[$property]
      }
      // Object Traps
      else if(this.#isObjectProperty($property)) {
        return $this.traps['Object'][$property] || root[$property]
      }
      // Array Traps
      else if(this.#isArrayProperty($property)) {
        return $this.traps['Array'][$property] || root[$property]
      }
      // Root
      // else {
      //   return root[$property]
      // }
    }
  }
  // Set Property
  get set() {
    const $this = this
    const {
      eventTarget, 
      root, 
      schema,
      basename,
      path,
    } = this.#settings
    const { enableValidation, validationEvents } = schema.options
    return function set($target, $property, $value, $receiver) {
      // Object Property
      if(this.#isObjectProperty($property)) {
        $this.traps['Object'][$property] = $value
      }
      // Array, Array Prototype Property
      else if(this.#isArrayProperty($property)) {
        $this.traps['Array'][$property] = $value
      }
      // Validation
      // if(enableValidation) {
      //   const validValue = schema.validateProperty($property, $value)
      //   if(validationEvents) {
      //     eventTarget.dispatchEvent(
      //       new ValidatorEvent('validateProperty', {
      //         basename,
      //         path,
      //         detail: validValue,
      //       }, eventTarget)
      //     )
      //   }
      //   if(!validValue.valid) { return false }
      // }
      // Dynamic Event Target Property
    //   if(typeof $value === 'object') {
    //     let subschema
    //     switch(schema.contextType) {
    //       case 'array': subschema = schema.context[0]; break
    //       case 'object': subschema = schema.context[$property]; break
    //     }
    //     $value = new Content($value, {
    //       basename,
    //       parent: eventTarget,
    //       path,
    //     }, subschema)
    //     root[$property] = $value
    //   }
    //   else {
    //     root[$property] = $value
    //   }
    //   const _basename = $property
    //   const _path = (path !== null)
    //     ? path.concat('.', $property)
    //     : $property
    //   eventTarget.dispatchEvent(
    //     new ContentEvent('set', {
    //       basename: _basename,
    //       path: _path,
    //       detail: {
    //         property: $property,
    //         value: $value,
    //       },
    //     }, eventTarget)
    //   )
      return true
    }
  }
  get deleteProperty() {
    const $this = this
    const {
      eventTarget, 
      root, 
    } = this.#settings
    let {
      basename,
      path,
    } = this.#settings
    const { merge } = this.#options.traps.properties.set
    return function deleteProperty($target, $property) {
      // delete root[$property]
      // eventTarget.dispatchEvent(
      //   new ContentEvent('delete', {
      //     basename,
      //     path,
      //     detail: {
      //       property: $property
      //     },
      //   }, eventTarget)
      // )
      return true
    }
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