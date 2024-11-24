import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function getContent() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { source, path } = $content
  const { contentEvents } = $content.options
  const ulteroptions = Object.assign({}, $options, arguments[0] || {})
  const { events } = ulteroptions
  // Get Property Event
  if(contentEvents && events['get']) {
    $content.dispatchEvent(
      new ContentEvent('get', {
        path,
        detail: {
          value: proxy
        }
      }, $content)
    )
  }
  return proxy
}