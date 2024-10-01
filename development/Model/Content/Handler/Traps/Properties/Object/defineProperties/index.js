import {
  typeOf,
  isDirectInstanceOf,
} from '../../Coutil/index.js'
import Content from '../../../../../index.js'
import ContentEvent from '../../../../../Event/index.js'
export default function DefineProperties(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options
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
        if(events.includes('defineProperties')) {
          eventTarget.dispatchEvent(
            new ContentEvent(
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
        }
        return root
      }
    }
  )
}