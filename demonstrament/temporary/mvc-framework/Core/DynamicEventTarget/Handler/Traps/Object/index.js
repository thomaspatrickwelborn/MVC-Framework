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
    )) { switch($objectPropertyName) {
      // Object Modification
      case 'assign':
      case 'defineProperties':
      case 'defineProperty':
      case 'freeze':
      case 'preventExtensions':
      case 'seal':
      case 'setPrototypeOf':
      // No Object Modification
      case 'entries':
      case 'fromEntries':
      case 'getOwnPropertyDescriptor':
      case 'getOwnPropertyDescriptors':
      case 'getOwnPropertyNames':
      case 'getOwnPropertySymbols':
      case 'getPrototypeOf':
      case 'getOwnPropertySymbols':
      case 'hasOwn':
      case 'is':
      case 'isExtensible':
      case 'isFrozen':
      case 'isSealed':
      case 'keys':
      case 'values':
      default:
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
        break
      }}
  }
}
