import { typeOf, isDirectInstanceOf } from '../../../../../../../Coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function defineProperties() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { events } = $options
  const { root, rootAlias, basename, path, schema } = $content
  const  { proxy } = $content
  const $propertyDescriptors = arguments[0]
  const properties = Object.entries($propertyDescriptors)
  .reduce(($properties, [
    $propertyDescriptorKey, $propertyDescriptor
  ]) => {
    $properties[$propertyDescriptorKey] = $propertyDescriptor.value
    return $properties
  }, {})
  // Iterate Property Descriptors
  iteratePropertyDescriptors: 
  for(const [
    $propertyKey, $propertyDescriptor
  ] of Object.entries($propertyDescriptors)) {
    // Property Descriptor Value Is Direct Instance Of Array/Object/Map
    $trap.defineProperty($propertyKey, $propertyDescriptor)
  }
  // Define Properties Event
  if(contentEvents && events.includes('defineProperties')) {
    $content.dispatchEvent(
      new ContentEvent(
        'defineProperties',
        {
          basename,
          path,
          detail: {
            descriptors: $propertyDescriptors,
          },
        },
        $content
      )
    )
  }
  return root
}