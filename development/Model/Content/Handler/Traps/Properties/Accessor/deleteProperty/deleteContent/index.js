import Content from '../../../../../../index.js'
import { ContentEvent } from '../../../../../../Events/index.js'
export default function DeleteContent($content, $options) {
  const { root, basename, path } = $content
  const { contentEvents } = $content.options
  return function deleteContent() {
    const { proxy } = $content
    // Arguments
    const ulteroptions = Object.assign({}, $options, arguments[0])
    const { events } = ulteroptions
    const rootPropertyEntries = Object.entries(root)
    for(const [$rootPropertyKey, $rootPropertyValue] of rootPropertyEntries) {
      proxy.delete($rootPropertyKey, ulteroptions)
    }
    // Delete Property Event
    if(contentEvents && events.includes('delete')) {
      $content.dispatchEvent(
        new ContentEvent('delete', {
          basename,
          path,
          detail: {
            value: $value
          }
        }, $content)
      )
    }
    return proxy
  }
}