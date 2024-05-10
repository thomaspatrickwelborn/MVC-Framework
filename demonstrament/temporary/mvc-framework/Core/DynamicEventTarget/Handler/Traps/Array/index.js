import DynamicEventTarget from '../../../index.js'
import Trap from '../Trap/index.js'
// Array Traps Are Array Class Instance Methods
export default class ArrayTrap extends Trap {
  constructor($aliases) {
    super($aliases)
    const $this = this
    const { $root } = this.aliases
    iterateArrayPrototypeProperties: 
    for(let $arrayPrototypePropertyName of Object.getOwnPropertyNames(
      Array.prototype
    )) { switch($arrayPrototypePropertyName) {
    default:
      Object.defineProperty(this, $arrayPrototypePropertyName, {
        get() {
          return function () {
            return $root[$arrayPrototypePropertyName](...arguments)
          }
        },
        set($value) {
          $root[$arrayPrototypePropertyName] = $value
        },
      })
    }}
  }
}