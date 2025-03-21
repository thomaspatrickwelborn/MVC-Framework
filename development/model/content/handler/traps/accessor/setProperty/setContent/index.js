import { recursiveAssign } from '../../../../../../../coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../events/index.js'
export default function setContent() {
  const $arguments = [...arguments]
  const $content = Array.prototype.shift.call($arguments)
  const $options = Array.prototype.shift.call($arguments)
  const { path, proxy } = $content
  // Delete Preterproperties
  // proxy.delete()
  proxy.delete({
    events: {
      ['delete']: false, 
      ['deleteProperty']: false, 
      ['deleteProperty:$key']: false
    }
  })
  // Arguments
  const $value = $arguments[0]
  // Ulteroptions
  const ulteroptions = recursiveAssign({
    setObject: $value
  }, $options, $arguments[1])
  // console.log("setContent", "ulteroptions", ulteroptions)
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
  if(events && events['set']) {
    $content.dispatchEvent(
      new ContentEvent('set', {
        path,
        value: $value,
        detail: {
          value: $value
        }
      }, $content)
    )
  }
  // Return Proxy
  return proxy
}