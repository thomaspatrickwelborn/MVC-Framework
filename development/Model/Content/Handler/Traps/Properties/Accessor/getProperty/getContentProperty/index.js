import Content from '../../../../../../index.js'
import { ContentEvent } from '../../../../../../Events/index.js'
export default function GetContentProperty($content, $options) {
  const { root, basename, path } = $content
  const { contentEvents } = $content.options
  return function getContentProperty() {
    // Arguments
    const $path = arguments[0]
    const ulteroptions = Object.assign(
      $options, arguments[1] || {}
    )
    const pathEntries = Object.entries($path)
    let value = root
    for(const [$subpathIndex, $subpath] of pathEntries) {
      if($subpathIndex === 0) { value = root[$subpath] }
      else if(value instanceof Content) { value = value.get($subpath) }
    }
    return value
  }
}