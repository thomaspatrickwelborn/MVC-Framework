import copyWithin from './CopyWithin/index.js'
import fill from './Fill/index.js'
import length from './Length/index.js'
import pop from './Pop/index.js'
import push from './Push/index.js'
import shift from './Shift/index.js'
import splice from './Splice/index.js'
import unshift from './Unshift/index.js'

const Methods = {}
const validMethods = [
  'copyWithin' ,'fill' ,'length' ,'pop' ,'push' ,'shift' ,'splice' ,'unshift'
]

import DynamicEventTarget from '../../../index.js'
import Trap from '../Trap/index.js'
// Array Traps Are Array Class Instance Methods
export default class ArrayTrap extends Trap {
  constructor($aliases, $options) {
    super($aliases)
    const $this = this
    const { $eventTarget, $root, $rootAlias } = this.aliases
    iterateArrayPrototypeProperties: 
    for(let $arrayPrototypePropertyName of Object.getOwnPropertyNames(
      Array.prototype
    )) { switch($arrayPrototypePropertyName) {
      // Array Modification
      // Array Copy Within
      case 'copyWithin': CopyWithin(this, $arrayPrototypePropertyName, $aliases)
      break
      // Array Fill
      case 'fill': Fill(this, $arrayPrototypePropertyName, $aliases)
      break
      // Array Length
      case 'length': Length(this, $arrayPrototypePropertyName, $aliases)
      break
      // Array Pop
      case 'pop': Pop(this, $arrayPrototypePropertyName, $aliases)
      break
      // Array Push
      case 'push': Push(this, $arrayPrototypePropertyName, $aliases)
      break
      // Array Shift
      case 'shift': Shift(this, $arrayPrototypePropertyName, $aliases)
      break
      // Array Splice
      case 'splice':  Splice(this. $arrayPrototypePropertyName, $aliases)
      break
      // Array Unshift
      case 'unshift': Unshift(this, $arrayPrototypePropertyName, $aliases)
      break
      // case 'reverse': Object.defineProperty(
      //   $this, $arrayPrototypePropertyName, {}
      // )
      // break
      // case 'sort':
      // No Array Modification
      // case 'at':
      // case 'concat':
      // case 'entries':
      // case 'flat':
      // case 'includes':
      // case 'indexOf':
      // case 'join':
      // case 'keys':
      // case 'lastIndexOf':
      // case 'reduce':
      // case 'reduceRight':
      // case 'some':
      // case 'toLocaleString':
      // case 'toReversed':
      // case 'toSorted':
      // case 'toSpliced':
      // case 'toString':
      // case 'slice':
      // Iterative Methods
      // case 'every':
      // case 'filter':
      // case 'find':
      // case 'findIndex':
      // case 'findLast':
      // case 'findLastIndex':
      // case 'flatMap':
      // case 'forEach':
      // case 'map':
      default: Default(this, $arrayPrototypePropertyName, $aliases)
      break
    }}
  }
}

