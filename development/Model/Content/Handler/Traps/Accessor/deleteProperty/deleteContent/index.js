import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function deleteContent() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  // const { events } = $options
  console.log($content)
  const { target, path, schema, proxy } = $content
  const { enableValidation, validationEvents } = $content.options
  // Arguments
  const ulteroptions = Object.assign({}, $options, arguments[0], { validationEvents: false })
  const { events } = ulteroptions
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