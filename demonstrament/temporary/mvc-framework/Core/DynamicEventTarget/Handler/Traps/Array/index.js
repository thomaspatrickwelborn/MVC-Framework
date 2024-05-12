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
      // Array Push
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
      case 'splice':  Object.defineProperty(
        $this, $arrayPrototypePropertyName, {
          value: function() {
            const $arguments = [...arguments]
            const start = $arguments[0]
            const deleteCount = $arguments[1] || $root.length - start
            const items = $arguments.slice(2) || []
            const deletedItems = []
            let deleteCountIndex = 0
            // Delete Items
            while(deleteCountIndex < deleteCount) {
              const spliceItem = $root.splice(start, 1)
              if(spliceItem.length !== 0) {
                deletedItems.push(
                  spliceItem[0]
                )
                // Splice Delete Event
              }
              deleteCountIndex++
            }
            // Add Items
            let addItemIndex = start
            let itemsIndex = 0
            while(addItemIndex < items.length) {
              $root.splice(addItemIndex, 0, items[itemsIndex])
              // Splice Add Event
              addItemIndex++
              itemsIndex++
            }
            // Splice Event
            return deletedItems
          }
        }
      )
      break
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
      // case 'copyWithin':
      // case 'fill':
      // case 'length':
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

