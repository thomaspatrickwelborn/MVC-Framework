import { recursiveAssign, impandTree, typedObjectLiteral } from '../../../../../../coutil/index.js'
import Content from '../../../../index.js'
import { ContentEvent } from '../../../../events/index.js'
export default function defineProperties() {
  const $arguments = [...arguments]
  const [$content, $options, $propertyDescriptors] = $arguments
  const ulteroptions = recursiveAssign({}, $options, $content.options)
  // console.log("defineProperties", "ulteroptions", ulteroptions)
  const { events } = $options
  const { path, proxy } = $content
  // const {} = $content.options
  const propertyDescriptorEntries = Object.entries($propertyDescriptors)
  const impandPropertyDescriptors = impandTree($propertyDescriptors, 'value')
  let properties = typedObjectLiteral($content.object)
  // Iterate Property Descriptors
  iteratePropertyDescriptors: 
  for(const [
    $propertyKey, $propertyDescriptor
  ] of propertyDescriptorEntries) {
    // Property Descriptor Value Is Direct Instance Of Array/object/Map
    proxy.defineProperty($propertyKey, $propertyDescriptor, $propertyDescriptors)
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