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
    // No Array Modification
    case 'at':
    case 'concat':
    case 'entries':
    case 'every':
    case 'filter':
    case 'find':
    case 'findIndex':
    case 'findLast':
    case 'findLastIndex':
    case 'flat':
    case 'flatMap':
    case 'forEach':
    case 'includes':
    case 'indexOf':
    case 'join':
    case 'keys':
    case 'lastIndexOf':
    case 'map':
    case 'reduce':
    case 'reduceRight':
    case 'some':
    case 'sort':
    case 'toLocaleString':
    case 'toReversed':
    case 'toSorted':
    case 'toSpliced':
    case 'toString':
    case 'slice':
      // break
    // Array Modification
    case 'copyWithin':
    case 'fill':
    case 'length':
    case 'push':
    case 'pop':
    case 'reverse':
    case 'shift':
    case 'sort':
    case 'splice':
    case 'unshift':
    default:
      Object.defineProperty(this, $arrayPrototypePropertyName, {
        get() {
          if(typeof $root[$arrayPrototypePropertyName] === 'function') {
            return function () {
              return $root[$arrayPrototypePropertyName](...arguments)
            }
          }
          return $root[$arrayPrototypePropertyName]
        },
        set($value) {
          $root[$arrayPrototypePropertyName] = $value
        },
      })
    }}
  }
}