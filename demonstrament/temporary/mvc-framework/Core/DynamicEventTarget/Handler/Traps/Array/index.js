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
      // Array Fill
      case 'fill': Object.defineProperty(
        $this, $arrayPrototypePropertyName, {
          value: function() {
            const $arguments = [...arguments]
            const value = $arguments[0]
            const start = (
              $arguments[1] >= 0
            ) ? $arguments[1]
              : $root.length - $arguments[1]
            const end = (
              $arguments[2] >= 0
            ) ? $arguments[2]
              : $root.length - $arguments[2]
            let fillIndex = start
            while(
              fillIndex < $root.length &&
              fillIndex < end
            ) {
              $root.fill(value, fillIndex, fillIndex + 1)
              $this.createEvent(
                $eventTarget,
                'fillIndex',
                {
                  start: fillIndex,
                  end: fillIndex + 1,
                  value,
                },
              )
              fillIndex++
            }
            $this.createEvent(
              $eventTarget,
              'fill',
              { start, end, value },
            )
          }
        }
      )
      break
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
      // Array Pop
      case 'pop': Object.defineProperty(
        $this, $arrayPrototypePropertyName, {
          value: function() {
            const popElement = $root.pop()
            const popElementIndex = $root.length - 1
            $this.createEvent(
              $eventTarget,
              'pop',
              {
                element: popElement,
                elementIndex: popElementIndex,
              }
            )
          }
        }
      )
      break
      // Array Shift
      case 'shift': Object.defineProperty(
        $this, $arrayPrototypePropertyName, {
          value: function() {
            const shiftElement = $root.shift()
            const shiftElementIndex = 0
            $this.createEvent(
              $eventTarget,
              'shift',
              {
                element: shiftElement,
                elementIndex: shiftElementIndex,
              }
            )
          }
        }
      )
      break
      // Array Splice
      case 'splice':  Object.defineProperty(
        $this, $arrayPrototypePropertyName, {
          value: function() {
            const $arguments = [...arguments]
            const start = (
              $arguments[0] >= 0
            ) ? $arguments[0]
              : $root.length - $arguments[0]
            const deleteCount = (
              $arguments[1] <= 0
            ) ? 0
              : (
              $arguments[1] === undefined ||
              start + $arguments[1] >= $root.length
            ) ? $root.length - start
              : $arguments[1]
            const addItems = $arguments.slice(2)
            const addCount = addItems.length
            const deleteItems = []
            let deleteItemsIndex = 0
            while(deleteItemsIndex < deleteCount) {
              const deleteItem = $root.splice(start, 1)[0]
              deleteItems.push(deleteItem)
              $this.createEvent(
                $eventTarget,
                'spliceDelete',
                {
                  deleteIndex: deleteItemsIndex,
                  deleteItem: deleteItem,
                },
              )
              deleteItemsIndex++
            }
            let addItemsIndex = 0
            while(addItemsIndex < addCount) {
              const addItem = addItems[addItemsIndex]
              $root.splice(
                start + addItemsIndex, 0, addItem
              )
              $this.createEvent(
                $eventTarget,
                'spliceAdd',
                {
                  addIndex: addItemsIndex,
                  addItem: addItem,
                },
              )
              addItemsIndex++
            }
            $this.createEvent(
              $eventTarget,
              'splice',
              {
                start,
                deleted: deleteItems,
                added: addItems,
              },
            )
            return deleteItems
          }
        }
      )
      break
      // Array Unshift
      case 'unshift': Object.defineProperty(
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
              elements.unshift($element)
              $root.unshift($element)
              // Unshift Prop Event
              $this.createEvent(
                $eventTarget,
                'unshiftProp',
                {
                  elementIndex, 
                  element: $element,
                },
                $root,
              )
              elementIndex++
            }
            // Unshift Event
            $this.createEvent(
              $eventTarget,
              'unshift',
              { elements },
              $root,
            )
            return $root.length
          }
        }  
      )
      break
      case 'length': Object.defineProperty(
        $this, $arrayPrototypePropertyName, {
          get() {
            return $root.length
          },
          set($length) {
            $root.length = $length
          }
        }
      )
      break
      // case 'copyWithin':
      // case 'reverse':
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

