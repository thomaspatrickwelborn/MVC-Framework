import { impandTree, typedObjectLiteral } from '../../../../../../Coutil/index.js'
import Content from '../../../../index.js'
import { ContentEvent } from '../../../../Events/index.js'
export default function defineProperties() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { events } = $options
  const { source, path, schema, proxy } = $content
  const { enableValidation, validationEvents } = $content.options
  const $propertyDescriptors = arguments[0]
  const propertyDescriptorEntries = Object.entries($propertyDescriptors)
  const impandPropertyDescriptors = impandTree($propertyDescriptors, 'value')
  let properties = typedObjectLiteral($content.object)
  // Iterate Property Descriptors
  iteratePropertyDescriptors: 
  for(const [
    $propertyKey, $propertyDescriptor
  ] of propertyDescriptorEntries) {
    // Property Descriptor Value Is Direct Instance Of Array/Object/Map
    proxy.defineProperty($propertyKey, $propertyDescriptor)
  }
  // Define Properties Event
  if(events && events['defineProperties']) {
    // Define Properties Validator Event
    $content.dispatchEvent(
      new ContentEvent(
        'defineProperties',
        {
          path,
          value: proxy,
          detail: {
            descriptors: $propertyDescriptors,
          },
        },
        $content
      )
    )
  }
  return proxy
}