import { typeOf, typedInstance } from '../../../../../../../Utils/index.js'
import DynamicEventTarget from '../../../../../index.js'
export default function DefineProperties(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { $eventTarget, $root, $rootAlias } = $aliases
  const { /* descriptorTree, */ descriptorValueMerge } = $options
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $propertyDescriptors = arguments[0]
        for(let [
          $propertyKey, $propertyDescriptor
        ] of Object.entries($propertyDescriptors)) {
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
          Object.defineProperties($root, {
            [$propertyKey]: $propertyDescriptor
          })
          $trap.createEvent(
            $eventTarget,
            'defineProperty',
            {
              prop: $propertyKey,
              descriptor: $propertyDescriptor,
            },
            $root,
          )
          $trap.createEvent(
            $eventTarget,
            'definePropertyKey',
            {
              prop: $propertyKey,
              descriptor: $propertyDescriptor,
            },
            $root,
          )
        }
        $trap.createEvent(
          $eventTarget,
          'defineProperties',
          {
            descriptors: $propertyDescriptors,
          },
        )
        return $root
      }
    }
  )
}
