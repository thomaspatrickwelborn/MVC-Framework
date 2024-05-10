import DynamicEventTarget from '../../../index.js'
import Trap from '../Trap/index.js'
// Object Traps Are Object Class Static Methods
export default class ObjectTrap extends Trap {
  constructor($aliases) {
    super($aliases)
    const $this = this
    const { $root } = this.aliases
    for(let $objectPropertyName of Object.getOwnPropertyNames(
      Object
    )) {
      Object.defineProperty(this, $objectPropertyName, {
        get() {
          return function () {
            return Object[$objectPropertyName]($root, ...arguments)
          }
        },
        set($value) {
          $root[$objectPropertyName] = $value
        },
      })
    }
  }
}
