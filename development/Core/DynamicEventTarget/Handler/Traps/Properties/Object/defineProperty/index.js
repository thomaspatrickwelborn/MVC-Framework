import { typeOf, isDirectInstanceOf } from '../../Coutil/index.js'
import DynamicEventTarget from '../../../../../index.js'
export default function DefineProperty(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { $eventTarget, $root } = $aliases
  const { descriptorValueMerge, descriptorTree } = $options
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        let propertyKey = arguments[0]
        let propertyDescriptor = arguments[1]
        if(isDirectInstanceOf(
          propertyDescriptor.value, [Object, Array, Map]
        )) {
          const rootPropertyDescriptor = Object.getOwnPropertyDescriptor(
            $root, $propertyKey
          ) || {}
          // Descriptor Value Merge
          if(
            descriptorValueMerge === true &&
            rootPropertyDescriptor.value instanceof DynamicEventTarget
          ) {
            propertyDescriptor.value = rootPropertyDescriptor.value
          }   else {
            propertyDescriptor.value = new DynamicEventTarget(
              propertyDescriptor.value, {
                rootAlias: $rootAlias,
              }
            )
          }
        }
        Object.defineProperty($root, propertyKey, propertyDescriptor)
        // Descriptor Tree
        if(
          descriptorTree === true &&
          propertyDescriptor.defineProperties !== undefined
        ) {
          for(let [
            $subpropertyKey, $subpropertyDescriptor
          ] of Object.entries(propertyDescriptor.defineProperties)) {
            propertyDescriptor.defineProperty($subpropertyKey, $subpropertyDescriptor)
          }
        }
        $trap.createEvent(
          $eventTarget,
          'defineProperty',
          {
            prop: propertyKey,
            descriptor: propertyDescriptor,
            path: $path,
            basename: $basename,
          },
        )
        return $root
      }
    }
  )
}