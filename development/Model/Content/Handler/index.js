import { typeOf } from '../../../Coutil/index.js'
import Content from '../index.js'
import ContentEvent from '../Event/index.js'
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
      schema,
    } = this.#settings
    return function get($target, $property, $receiver) {
      // Root Property
      if(this.#isRootProperty($property)) {
        return this.proxy
      }
      // Event Target/Dynamic Event Target Property
      else if(this.#isEventTargetOrContentProperty($property)) {
        if(typeof eventTarget[$property] === 'function') {
          return eventTarget[$property].bind(eventTarget)
        }
        return eventTarget[$property]
      }
      // Object Property Traps
      else if(this.#isObjectProperty($property)) {
        return $this.traps['Object'][$property] || root[$property]
      }
      // Array Property Traps
      else if(this.#isArrayProperty($property)) {
        return $this.traps['Array'][$property] || root[$property]
      }
      // Root Property
      else {
        return root[$property]
      }
    }
  }
  // Set Property
  get set() {
    const $this = this
    const {
      eventTarget, 
      root, 
      rootAlias, 
      schema,
      basename,
      path,
    } = this.#settings
    const { enableValidation, validationType } = schema.options
    return function set($target, $property, $value, $receiver) {
      let valid
      // Object Property
      if(this.#isObjectProperty($property)) {
        $this.traps['Object'][$property] = $value
      }
      // Array, Array Prototype Property
      else if(this.#isArrayProperty($property)) {
        $this.traps['Array'][$property] = $value
      }
      // Dynamic Event Target Property
      else if(typeof $value === 'object') {
        let subschema
        switch(schema.contextType) {
          case 'array': subschema = schema.context[0]; break
          case 'object': subschema = schema.context[$property]; break
        }
        valid = (enableValidation && validationType === 'object')
          ? subschema.validate($value).valid
          : null
        if(valid === true || valid === null) {
          $value = new Content($value, {
            basename,
            parent: eventTarget,
            path,
            rootAlias,
          }, subschema)
          root[$property] = $value
        }
      }
      else {
        valid = (enableValidation && validationType === 'property')
          ? schema.validateProperty($property, $value).valid
          : null
        if(valid === true || valid === null) {
          root[$property] = $value
        }
      }
      if(valid === true || valid === null) {
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
      }  
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
        new ContentEvent('delete', {
          basename,
          path,
          detail: {
            property: $property
          },
        }, eventTarget)
      )
      return true
    }
  }
  #isRootProperty($property) {
    return ($property === this.#settings.rootAlias)
  }
  #isContentProperty($property) {
    return ((
      Object.getOwnPropertyNames(EventTarget.prototype)
      .includes($property) ||
      Object.getOwnPropertyNames(Content.prototype)
      .includes($property)
    ))
  }
  #isEventTarget($property) {
    return ((
      Object.getOwnPropertyNames(EventTarget.prototype)
      .includes($property) ||
      Object.getOwnPropertyNames(Content.prototype)
      .includes($property)
    ))
  }
  #isEventTargetOrContentProperty($property) {
    return ((
      this.#isEventTarget($property) ||
      this.#isContentProperty($property)
    ))
  }
  #isObjectProperty($property) {
    return ((
      Object.getOwnPropertyNames(Object)
      .includes($property)
    ))
  }
  #isArrayProperty($property) {
    return ((
      Object.getOwnPropertyNames(Array.prototype)
      .includes($property) ||
      Object.getOwnPropertyNames(Array)
      .includes($property)
    ))
  }
  #isFunctionProperty($property) {
    return (
      Object.getOwnPropertyNames(Function.prototype)
      .includes($property)
    )
  }
}