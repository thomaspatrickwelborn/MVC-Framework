import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function getContent() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { target, path } = $content
  const ulteroptions = Object.assign({}, $options, arguments[0] || {})
  const { events } = ulteroptions
  // Get Property Event
  if(events && events['get']) {
    $content.dispatchEvent(
      new ContentEvent('get', {
        path,
        value: proxy,
        detail: {
          value: proxy
        }
      }, $content)
    )
  }
  return proxy
}