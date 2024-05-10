import DynamicEventTarget from '../../../index.js'
import Trap from '../Trap/index.js'
// Object Traps Are Object Class Static Methods
export default class ObjectTrap extends Trap {
  constructor($aliases) {
    super($aliases)
    const $this = this
    const { $root, $rootAlias } = this.aliases
    for(let $objectPropertyName of Object.getOwnPropertyNames(
      Object
    )) { switch($objectPropertyName) {
      case 'assign': Object.defineProperty(
        this, $objectPropertyName, {
        value: function() {
          for(let $source of [...arguments]) {
            for(let [
              $sourcePropKey, $sourcePropVal
            ] of Object.entries($source)) {
              if(typeof $sourcePropVal === 'object') {
                $sourcePropVal = new DynamicEventTarget(
                  $sourcePropVal, {
                    $rootAlias
                  }
                )
              }
              $root[$sourcePropKey] = $sourcePropVal
            }
          }
          return $root
        }}
      )
      break
      case 'defineProperties': Object.defineProperty(
        this, $objectPropertyName, {
        value: function() {
          for(let [
            $propertyKey, $propertyDescriptor
          ] of Object.entries(arguments[0])) {
            if(typeof $propertyDescriptor.value === 'object') {
              $propertyDescriptor.value = new DynamicEventTarget(
                $propertyDescriptor.value, {
                  $rootAlias
                }
              )
            }
            Object.defineProperty(
              $root, $propertyKey, $propertyDescriptor
            )
          }
          return $root
        }}
      )
      break
      case 'defineProperty': Object.defineProperty(
        this, $objectPropertyName, {
          value: function() {
            let propertyKey = arguments[0]
            let propertyDescriptor = arguments[1]
            if(typeof propertyDescriptor.value === 'object') {
              propertyDescriptor.value = new DynamicEventTarget(
                propertyDescriptor.value, {
                  $rootAlias
                }
              )
            }
            return Object.defineProperty(
              $root, propertyKey, propertyDescriptor
            )
          }
        }
      )
      break
      case 'fromEntries': Object.defineProperty(
        this, $objectPropertyName, {
          value: function() {
            return Object[$objectPropertyName](
              Object.entries($root)
            )
          }
        }
      )
      break
      case 'entries':
      case 'freeze':
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
      case 'values': Object.defineProperty(
        this, $objectPropertyName, {
          value: function () {
            return Object[$objectPropertyName]($root, ...arguments)
          }
        }
      )
      break
      default: Object.defineProperty(
        this, $objectPropertyName, {
          get() {
            return function () {
              return Object[$objectPropertyName]($root, ...arguments)
            }
          },
          set($value) {
            $root[$objectPropertyName] = $value
          },
        }
      )
      break
    }}
  }
}
