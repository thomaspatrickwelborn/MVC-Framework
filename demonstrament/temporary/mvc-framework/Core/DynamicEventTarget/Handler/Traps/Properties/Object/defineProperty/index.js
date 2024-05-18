import { typeOf, typedInstance } from '../../../../../../../Utils/index.js'
import DynamicEventTarget from '../../../../../index.js'
export default function DefineProperty(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { $eventTarget, $root } = $aliases
  const { descriptorValueMerge } = $options
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        let propertyKey = arguments[0]
        let propertyDescriptor = arguments[1]
        const rootPropertyDescriptor = Object.getOwnPropertyDescriptor(
          $root, $propertyKey
        ) || {}
        if(typeof $propertyDescriptor.value === 'object') {
          if(
            descriptorValueMerge === true &&
            rootPropertyDescriptor.value instanceof DynamicEventTarget
          ) {
            rootPropertyDescriptor.value.defineProperties(
              $propertyDescriptor.value
            )
          } else {
            $propertyDescriptor.value = new DynamicEventTarget(
              typedInstance(typeOf(rootPropertyDescriptor), {
                rootAlias: $rootAlias,
              }
            ))
          }
        }
        Object.defineProperty($root, $propertyKey, $propertyDescriptor)
        $trap.createEvent(
          $eventTarget,
          'defineProperty',
          {
            prop: propertyKey,
            descriptor: propertyDescriptor,
          },
        )
        $trap.createEvent(
          $eventTarget,
          'definePropertyKey',
          {
            prop: propertyKey,
            descriptor: propertyDescriptor,
          },
        )
        return $root
      }
    }
  )
}