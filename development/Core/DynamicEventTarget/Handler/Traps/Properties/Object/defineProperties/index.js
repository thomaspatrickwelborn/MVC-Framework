import { typeOf, isDirectInstanceOf } from '../../Coutil/index.js'
import DynamicEventTarget from '../../../../../index.js'
export default function DefineProperties(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { $eventTarget, $root, $rootAlias, $path, $basename } = $aliases
  const { descriptorValueMerge, descriptorTree } = $options
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $propertyDescriptors = arguments[0]
        for(const [
          $propertyKey, $propertyDescriptor
        ] of Object.entries($propertyDescriptors)) {
          if(isDirectInstanceOf(
            $propertyDescriptor.value, [Array, Object, Map]
          )) {
            const rootPropertyDescriptor = Object.getOwnPropertyDescriptor(
              $root, $propertyKey
            ) || {}
            // Descriptor Value Merge
            if(
              descriptorValueMerge === true &&
              rootPropertyDescriptor.value instanceof DynamicEventTarget
            ) {
              $propertyDescriptor.value = rootPropertyDescriptor.value
            } else {
              $propertyDescriptor.value = new DynamicEventTarget(
                $propertyDescriptor.value, {
                  rootAlias: $rootAlias,
                }
              )
            }
          }
          Object.defineProperties($root, {
            [$propertyKey]: $propertyDescriptor
          })
          // Descriptor Tree
          if(
            descriptorTree === true &&
            $propertyDescriptor.defineProperties !== undefined
          ) {
            $propertyDescriptor.value.defineProperties(
              $propertyDescriptor.defineProperties
            )
          }
          $trap.createEvent(
            $eventTarget,
            'defineProperty',
            {
              prop: $propertyKey,
              descriptor: $propertyDescriptor,
              path: $path,
              basename: $basename,
            },
            $root,
          )
        }
        $trap.createEvent(
          $eventTarget,
          'defineProperties',
          {
            descriptors: $propertyDescriptors,
            path: $path,
            basename: $basename,
          },
        )
        return $root
      }
    }
  )
}
