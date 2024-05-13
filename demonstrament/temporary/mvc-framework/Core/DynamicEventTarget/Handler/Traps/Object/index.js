import DynamicEventTarget from '../../../index.js'
import Trap from '../Trap/index.js'
import * as Properties from './Properties/index.js'
const methodNames = [
  'assign', 'defineProperties', 'defineProperty', 'fromEntries', 'freeze', 'seal', 'values'
]
// Array Traps Are Array Class Instance Methods
export default class ArrayTrap extends Trap {
  constructor($aliases, $options) {
    super($aliases, $options)
    const $this = this
    const { $eventTarget, $root, $rootAlias } = this.aliases
    // Iterate Object Class Property Names
    iterateObjectClassPropertyNames: 
    for(let $objectClassPropertyName of Object.getOwnPropertyNames(
      Object
    )) {
      if(Properties[$objectClassPropertyName] !== undefined) {
        Properties[$objectClassPropertyName](
          this, $objectClassPropertyName, $aliases
        )
      } else {
        Properties._default(
          this, $objectClassPropertyName, $aliases
        )
      }
    }
    return this
  }
}
