import DynamicEventTarget from '../../../index.js'
import Trap from '../Trap/index.js'
// Object Traps Are Object Class Static Methods
export default class ObjectTrap extends Trap {
  constructor($aliases) {
    super($aliases)
    const $this = this
    const { $root } = this.aliases
    for(var $methodName of Object.getOwnPropertyNames(
      Object
    )) {
      Object.defineProperty(this, $methodName, {
        get() { return function() {
          return Object[$methodName]($root, ...arguments)
        } }
      })
    }
    Object.freeze(this)
  }
}
