import Content from '../../../../../../index.js'
import { ContentEvent } from '../../../../../../Events/index.js'
export default function GetContent($content, $options) {
  const { root, basename, path } = $content
  const { contentEvents } = $content.options
  return function getContent() {
    const ulteroptions = Object.assign({}, $options, arguments[0] || {})
    const { events } = ulteroptions
    // Get Property Event
    if(contentEvents && events.includes('get')) {
      $content.dispatchEvent(
        new ContentEvent('get', {
          basename,
          path,
          detail: {
            value: proxy
          }
        }, $content)
      )
    }
    return proxy
  }
}