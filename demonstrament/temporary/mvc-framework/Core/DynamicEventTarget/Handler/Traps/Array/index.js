import DynamicEventTarget from '../../../index.js'
import Trap from '../Trap/index.js'
// Array Traps Are Array Class Instance Methods
export default class ArrayTrap extends Trap {
  constructor($aliases) {
    super($aliases)
    const $this = this
    const { $eventTarget, $root, $rootAlias } = this.aliases
    iterateArrayPrototypeProperties: 
    for(let $arrayPrototypePropertyName of Object.getOwnPropertyNames(
      Array.prototype
    )) { switch($arrayPrototypePropertyName) {
      // Array Modification
      case 'copyWithin':
      case 'fill':
      case 'length':
      case 'push': Object.defineProperty(
        $this, $arrayPrototypePropertyName, {
          value: function() {
            const elements = []
            let elementIndex = 0
            iterateElements:
            for(let $element of arguments) {
              if(typeof $element === 'object') {
                $element = new DynamicEventTarget($element, {
                  rootAlias: $rootAlias,
                })
              }
              elements.push($element)
              $root.push($element)
              // Push Prop Event
              $this.createEvent(
                $eventTarget,
                'pushProp',
                {
                  elementIndex, 
                  element: $element,
                },
                $root,
              )
              elementIndex++
            }
            // Push Event
            $this.createEvent(
              $eventTarget,
              'push',
              { elements },
              $root,
            )
            return $root.length
          }
        }  
      )
      break
      case 'pop':
      case 'reverse':
      case 'shift':
      case 'sort':
      case 'splice':
      case 'unshift':
      // No Array Modification
      case 'at':
      case 'concat':
      case 'entries':
      case 'flat':
      case 'includes':
      case 'indexOf':
      case 'join':
      case 'keys':
      case 'lastIndexOf':
      case 'reduce':
      case 'reduceRight':
      case 'some':
      case 'toLocaleString':
      case 'toReversed':
      case 'toSorted':
      case 'toSpliced':
      case 'toString':
      case 'slice':
      // Iterative Methods
      case 'every':
      case 'filter':
      case 'find':
      case 'findIndex':
      case 'findLast':
      case 'findLastIndex':
      case 'flatMap':
      case 'forEach':
      case 'map':
      default: Object.defineProperty(
        $this, $arrayPrototypePropertyName, {
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
      break
    }}
  }
}

