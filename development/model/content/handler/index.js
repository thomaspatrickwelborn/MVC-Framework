import { typeOf } from '../../../coutil/index.js'
import Content from '../index.js'
import { ContentEvent, ValidatorEvent } from '../events/index.js'
import Traps from './traps/index.js'

export default class Handler {
  #content
  #_traps
  constructor($content) {
    this.#content = $content
    this.#traps
  }
  get #traps() {
    if(this.#_traps !== undefined) return this.#_traps
    this.#_traps = new Traps(this.#content)
    return this.#_traps
  }
  // Enabled Trap
  get get() {
    const content = this.#content
    const traps = this.#traps
    const { target, schema, path } = content
    return function get($target, $property, $receiver) {
      // Accessor Traps
      if(this.#isAccessorProperty($property)) {
        return traps['Accessor'][$property]
      }
      // Content Class Instance Trap
      else if(
        this.#isEventTargetProperty($property) ||
        this.#isContentProperty($property)
      ) {
        if(typeof content[$property] === 'function') {
          return content[$property].bind(content)
        }
        return content[$property]
      }
      // Object Traps
      else if(this.#isObjectProperty($property)) {
        return traps['Object'][$property]
      }
      // Array Traps
      else if(this.#isArrayProperty($property)) {
        return traps['Array'][$property]
      }
      // Undefined
      else { return undefined }
    }
  }
  // Disabled Traps
  get apply() {}
  get construct() {}
  get deleteProperty() {}
  get defineProperty() {}
  get getOwnPropertyDescriptor() {}
  get getPrototypeOf() {}
  get has() {}
  get isExtensible() {}
  get ownKeys() {}
  get preventExtensions() {}
  get set() {
    const content = this.#content
    return function set($target, $property, $value, $receiver) {
      if(this.#isContentProperty($property)) {
        content[$property] = $value
      }
      return true
    }
  }
  get setPrototypeOf() {}
  #isContentProperty($property) {
    return Object.getOwnPropertyNames(Content.prototype)
    .includes($property)
  }
  #isEventTargetProperty($property) {
    return Object.getOwnPropertyNames(EventTarget.prototype)
    .includes($property)
  }
  #isAccessorProperty($property) {
    return ['get', 'set', 'delete'].includes($property)
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
}