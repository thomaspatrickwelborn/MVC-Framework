import DynamicEventTarget from '../../../index.js'
import Trap from '../Trap/index.js'
// Array Traps Are Array Class Instance Methods
export default class ArrayTrap extends Trap {
  constructor($aliases) {
    super($aliases)
    const $this = this
    const { $root } = this.aliases
    for(var $methodName of Object.getOwnPropertyNames(
      Array.prototype
    )) {
      Object.defineProperty(this, $methodName, {
        get() { return function() {
          return $root[$methodName](...arguments)
        } },
      })
    }
    Object.freeze(this)
  }
}