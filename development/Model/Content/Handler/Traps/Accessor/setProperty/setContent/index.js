import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function setContent() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { basename, path } = $content
  const { contentEvents } = $content.options
  const { proxy } = $content
  // Delete Preterproperties
  proxy.delete()
  // Arguments
  const $value = arguments[0]
  // Ulteroptions
  const ulteroptions = Object.assign({}, $options, arguments[1])
  const contentOptions = $content.options
  contentOptions.traps.accessor.set = ulteroptions
  const { events } = ulteroptions
  // Set Anterproperties
  const properties = Object.entries($value)
  iterateProperties: 
  for(const [$propertyKey, $propertyValue] of properties) {
    proxy.set($propertyKey, $propertyValue, ulteroptions)
  }
  // Set Property Event
  if(contentEvents && events.includes('set')) {
    $content.dispatchEvent(
      new ContentEvent('set', {
        basename,
        path,
        detail: {
          value: $value
        }
      }, $content)
    )
  }
  // Return Proxy
  return proxy
}