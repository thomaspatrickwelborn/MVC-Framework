import { recursiveAssign } from '../../../../../../../coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../events/index.js'
export default function deleteContent() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { target, path, schema, proxy } = $content
  const { enableValidation, validationEvents } = $content.options
  // Arguments
  const ulteroptions = recursiveAssign({}, $options, arguments[0], { validationEvents: false })
  const { events } = ulteroptions
  // console.log("deleteContent", "ulteroptions", ulteroptions)
  const targetPropertyEntries = Object.entries(target)
  for(const [$targetPropertyKey, $targetPropertyValue] of targetPropertyEntries) {
    proxy.delete($targetPropertyKey, ulteroptions)
  }
  // Delete Property Event
  if(events && events['delete']) {
    $content.dispatchEvent(
      new ContentEvent('delete', {
        path,
        detail: {
          value: proxy
        }
      }, $content)
    )
  }
  return proxy
}