import { typeOf } from '../../../Coutil/index.js'
import Content from '../index.js'
import { ContentEvent, ValidatorEvent } from '../Events/index.js'
import Traps from './Traps/index.js'

export default class Handler {
  #content
  #traps
  constructor($content) {
    this.#content = $content
    this.#traps = new Traps(this.#content)
  }
  get get() {
    const $this = this
    const content = this.#content
    const {
      root, 
      schema,
      basename,
      path,
    } = content
    return function get($target, $property, $receiver) {
      // --------------
      // Accessor Traps
      // --------------
      if(this.#isAccessorProperty($property)) {
        return $this.#traps['Accessor'][$property]
      }
      // ---------------------------
      // Content Class Instance Trap
      // ---------------------------
      else if(this.#isEventTargetOrContentProperty($property)) {
        if(typeof content[$property] === 'function') {
          return content[$property].bind(content)
        }
        return content[$property]
      }
      // ------------
      // Object Traps
      // ------------
      else if(this.#isObjectProperty($property)) {
        return $this.#traps['Object'][$property]
      }
      // -----------
      // Array Traps
      // -----------
      else if(this.#isArrayProperty($property)) {
        return $this.#traps['Array'][$property]
      }
      // ---------
      // Undefined
      // ---------
      else { return undefined }
    }
  }
  get deleteProperty() {}
  get defineProperty() {}
  get set() {}
  #isAccessorProperty($property) {
    return ['get', 'set', 'delete'].includes($property)
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