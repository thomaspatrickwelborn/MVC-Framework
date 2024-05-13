import DynamicEventTarget from '../../../index.js'
import Trap from '../Trap/index.js'
import * as Properties from './Properties/index.js'
const methodNames = [
  'copyWithin' ,'fill' ,'length' ,'pop' ,'push' ,'shift' ,'splice' ,'unshift'
]
// Array Traps Are Array Class Instance Methods
export default class ArrayTrap extends Trap {
  constructor($aliases, $options) {
    super($aliases, $options)
    const $this = this
    const { $eventTarget, $root, $rootAlias } = this.aliases
    // Iterate Array Prototype Property Names
    iterateArrayPrototypePropertyNames: 
    for(let $arrayPrototypePropertyName of Object.getOwnPropertyNames(
      Array.prototype
    )) {
      if(Properties[$arrayPrototypePropertyName] !== undefined) {
        Properties[$arrayPrototypePropertyName](
          this, $arrayPrototypePropertyName, $aliases
        )
      } else {
        Properties._default(
          this, $arrayPrototypePropertyName, $aliases
        )
      }
    }
    return this
  }
}
