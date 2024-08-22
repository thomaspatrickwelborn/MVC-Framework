import {
  typeOf,
  isDirectInstanceOf,
  parseDEBD,
} from '../../Coutil/index.js'
import DynamicEventTarget from '../../../../../index.js'
import DynamicEvent from '../../../Events/DynamicEvent/index.js'
export default function DefineProperties(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { descriptorValueMerge, descriptorTree } = $options
  const {
    $eventTarget, 
    $root, 
    $rootAlias, 
    $basename,
    $path, 
  } = $aliases
  $eventTarget.addEventListener(
    'defineProperties', 
    ($event) => {
      if($eventTarget.parent !== null) {
        $eventTarget.parent.dispatchEvent(
          new DynamicEvent(
            ...parseDEBD($event)
          )
        )
      }
    }
  )
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
        $eventTarget.dispatchEvent(
          new DynamicEvent(
            'defineProperties',
            {
              basename: $basename,
              path: $path,
              detail: {
                descriptors: $propertyDescriptors,
              },
            }
          )
        )
        return $root
      }
    }
  )
}