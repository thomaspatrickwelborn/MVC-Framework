import { typeOf, isDirectInstanceOf } from '../../Coutil/index.js'
import DynamicEventTarget from '../../../../../index.js'
export default function DefineProperties(
  $trap, $trapPropertyName, $aliases, $options
) {
  const {
    $eventTarget, 
    $root, 
    $rootAlias, 
    $basename,
    $path, 
  } = $aliases
  const { descriptorValueMerge, descriptorTree } = $options
  function defineProperty($event) {
    const definePropertyEventData = {
      prop: $event.detail.prop,
      descriptor: $event.detail.descriptor,
      path: $event.path,
      basename: $event.basename,
    }
    $trap.createEvent(
      $eventTarget,
      'defineProperty',
      definePropertyEventData,
      $root,
    )
  }
  function defineProperties($event) {
    const definePropertiesEventData = {
      descriptors: $event.detail.descriptors,
      path: $event.path,
      basename: $event.basename,
    }
    $trap.createEvent(
      $eventTarget,
      'defineProperties',
      definePropertiesEventData,
      $root,
    )
  }
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
        // Define Properties Event Data
        const definePropertiesEventData = {
          descriptors: $propertyDescriptors,
          path: $path,
          basename: $basename,
        }
        // Define Properties Event
        $trap.createEvent(
          $eventTarget,
          'defineProperties',
          definePropertiesEventData,
        )
        return $root
      }
    }
  )
}