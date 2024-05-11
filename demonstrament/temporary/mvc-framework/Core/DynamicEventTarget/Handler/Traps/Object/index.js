import DynamicEventTarget from '../../../index.js'
import Trap from '../Trap/index.js'
// Object Traps Are Object Class Static Methods
export default class ObjectTrap extends Trap {
  constructor($aliases) {
    super($aliases)
    const $this = this
    const { $eventTarget, $root, $rootAlias } = this.aliases
    for(let $objectPropertyName of Object.getOwnPropertyNames(
      Object
    )) { switch($objectPropertyName) {
      case 'assign': Object.defineProperty(
        this, $objectPropertyName, {
        value: function() {
          iterateSources: 
          for(let $source of [...arguments]) {
            iterateSourceProps:
            for(let [
              $sourcePropKey, $sourcePropVal
            ] of Object.entries($source)) {
              if(
                typeof $sourcePropVal === 'object' &&
                !$sourcePropVal instanceof DynamicEventTarget
              ) {
                $sourcePropVal = new DynamicEventTarget(
                  $sourcePropVal, {
                    $rootAlias
                  }
                )
              }
              $root[$sourcePropKey] = $sourcePropVal
              this.createEvent(
                $eventTarget, 
                'assign:source:key',
                {
                  key: $sourcePropKey,
                  val: $sourcePropVal,
                  source: $source,
                },
                $root,
              )
            }
            this.createEvent(
              $eventTarget,
              'assign:source',
              {
                source: $source,
              },
              $root,
            )
          }
          this.createEvent(
            $eventTarget,
            'assign',
            {},
            $root,
          )
          return $root
        }}
      )
      break
      case 'defineProperties': Object.defineProperty(
        this, $objectPropertyName, {
        value: function() {
          const $propertyDescriptors = arguments[0]
          for(let [
            $propertyKey, $propertyDescriptor
          ] of Object.entries($propertyDescriptors)) {
            if(
              typeof $propertyDescriptor.value === 'object' &&
              !$sourcePropVal instanceof DynamicEventTarget
            ) {
              $propertyDescriptor.value = new DynamicEventTarget(
                $propertyDescriptor.value, {
                  $rootAlias
                }
              )
            }
            Object.defineProperty(
              $root, $propertyKey, $propertyDescriptor
            )
            this.createEvent(
              $eventTarget,
              'defineProperty',
              {
                prop: $propertyKey,
                descriptor: $propertyDescriptor,
              },
              $root,
            )
          }
          this.createEvent(
            $eventTarget,
            'defineProperties',
            {
              descriptors: $propertyDescriptors,
            },
            $root,
          )
          return $root
        }}
      )
      break
      case 'defineProperty': Object.defineProperty(
        this, $objectPropertyName, {
          value: function() {
            let propertyKey = arguments[0]
            let propertyDescriptor = arguments[1]
            if(
              typeof propertyDescriptor.value === 'object' &&
              !$sourcePropVal instanceof DynamicEventTarget
            ) {
              propertyDescriptor.value = new DynamicEventTarget(
                propertyDescriptor.value, {
                  $rootAlias
                }
              )
            }
            Object.defineProperty(
              $root, propertyKey, propertyDescriptor
            )
            this.createEvent(
              $eventTarget,
              'defineProperty',
              {
                prop: $propertyKey,
                descriptor: $propertyDescriptor,
              },
              $root,
            )
            return $root
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
      case 'freeze': Object.defineProperty(
        this, $objectPropertyName, {
          value: function () {
            Object.freeze($root)
            this.createEvent(
              $eventTarget,
              'freeze',
              {},
              $root
            )
            return $root
          }
        }
      )
      break
      case 'seal': Object.defineProperty(
        this, $objectPropertyName, {
          value: function () {
            Object.seal($root)
            this.createEvent(
              $eventTarget,
              'seal',
              {},
              $root
            )
            return $root
          }
        }
      )
      case 'values': Object.defineProperty(
        this, $objectPropertyName, {
          value: function () {
            return Object[$objectPropertyName]($root, ...arguments)
          }
        }
      )
      break
      case 'entries':
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
      case 'setPrototypeOf':
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
