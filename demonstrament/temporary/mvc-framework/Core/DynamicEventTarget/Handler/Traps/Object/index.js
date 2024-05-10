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
    case 'assign':
    case 'defineProperties':
    case 'defineProperty':
    case 'entries':
    case 'freeze':
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
    case 'preventExtensions':
    case 'seal':
    case 'setPrototypeOf':
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
