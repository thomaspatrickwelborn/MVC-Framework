import Content from '../../../../../../index.js'
import { ContentEvent } from '../../../../../../Events/index.js'
export default function GetContent($content, $options) {
  const { root, basename, path } = $content
  const { contentEvents } = $content.options
  return function getContent() {
    const ulteroptions = Object.assign({}, $options, arguments[1] || {})
    const { events } = ulteroptions
    return proxy
  }
}