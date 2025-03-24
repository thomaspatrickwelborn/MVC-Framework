import { recursiveAssign } from '../../../../../../../coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../events/index.js'
export default function setContent($content, $options, $properties) {
  const { path } = $content
  const ulteroptions = recursiveAssign({
    source: $properties
  }, $content.options.traps.accessor.set, $options)
  const { events } = ulteroptions
  iterateProperties: 
  for(const [$propertyKey, $propertyValue] of Object.entries($properties)) {
    $content.set($propertyKey, $propertyValue, ulteroptions)
  }
  // Set Property Event
  if(events && events['set']) {
    $content.dispatchEvent(
      new ContentEvent('set', {
        path,
        value: $properties,
        detail: {
          value: $properties
        }
      }, $content)
    )
  }
  // Return Proxy
  return $content
}