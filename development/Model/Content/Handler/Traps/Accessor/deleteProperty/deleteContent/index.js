import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function deleteContent() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { source, path } = $content
  const { contentEvents } = $content.options
  const { proxy } = $content
  // Arguments
  const ulteroptions = Object.assign({}, $options, arguments[0])
  const { events } = ulteroptions
  const sourcePropertyEntries = Object.entries(source)
  for(const [$sourcePropertyKey, $sourcePropertyValue] of sourcePropertyEntries) {
    proxy.delete($sourcePropertyKey, ulteroptions)
  }
  // Delete Property Event
  if(contentEvents && events['delete']) {
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