import {
  typeOf,
  isDirectInstanceOf,
} from '../../Coutil/index.js'
import DynamicEventTarget from '../../../../../index.js'
import DETEvent from '../../../../../DynamicEvent/index.js'
export default function DefineProperties(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { descriptorValueMerge, descriptorTree } = $options
  const {
    proxy,
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
  } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $propertyDescriptors = arguments[0]
        // Iterate Property Descriptors
        iteratePropertyDescriptors: 
        for(const [
          $propertyKey, $propertyDescriptor
        ] of Object.entries($propertyDescriptors)) {
          // Property Descriptor Value Is Direct Instance Of Array/Object/Map
          $trap.defineProperty($propertyKey, $propertyDescriptor)
        }
        // Define Properties Event
        eventTarget.dispatchEvent(
          new DETEvent(
            'defineProperties',
            {
              basename,
              path,
              detail: {
                descriptors: $propertyDescriptors,
              },
            },
            eventTarget
          )
        )
        return root
      }
    }
  )
}