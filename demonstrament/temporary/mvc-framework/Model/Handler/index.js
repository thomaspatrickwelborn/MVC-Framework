import Schema from './Schema/index.js'
import Validate from './Validate/index.js'

export default class Handler {
  #DynamicEventTargetPropertyNames = [].concat(
    Object.getOwnPropertyNames(EventTarget.prototype),
    Object.getOwnPropertyNames(Object.prototype),
    Object.getOwnPropertyNames(Array.prototype),
    Object.getOwnPropertyNames(Map.prototype),
    Object.getOwnPropertyNames(EventTarget),
    Object.getOwnPropertyNames(Object),
    Object.getOwnPropertyNames(Array),
    Object.getOwnPropertyNames(Map),
  )
  constructor($aliases, $options) {
    this.#aliases = $aliases
    return this
  }
  #aliases
  // Get
  get get() {
    const $this = this
    const { $core, $rootAlias, $root } = this.#aliases
    return function get($target, $property) {
      if(
        $this.#DynamicEventTargetPropertyNames
        .includes($property)
      ) {
        return $root[$property]
      }
      if(Object.getOwnPropertyNames($this[$property])) {
        return $this[$property]
      }
    }
  }
  get set() {
    const $this = this
    const { $core, $rootAlias, $root } = this.#aliases
    return function set($target, $property, $value) {
      if(
        $this.#DynamicEventTargetPropertyNames
        .includes($property)
      ) {
        $root[$property] = $value
      }
      return true
    }
  }
  get deleteProperty() {
    const $this = this
    const { $core, $rootAlias, $root } = this.#aliases
    return function deleteProperty($target, $property) {
      if(
        $this.#DynamicEventTargetPropertyNames
        .includes($property)
      ) {
        delete $root[$property]
      }
      return true
    }
  }
}