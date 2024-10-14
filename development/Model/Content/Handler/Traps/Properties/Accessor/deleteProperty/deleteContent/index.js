import Content from '../../../../../../index.js'
import { ContentEvent } from '../../../../../../Events/index.js'
export default function DeleteContent($content, $options) {
  const { root, basename, path, schema } = $content
  return function deleteContent() {
    // Arguments
    const ulteroptions = Object.assign(
      $options, arguments[1] || {}
    )
    const { recursive, events, pathKey, pathSep, pathEsc } = ulteroptions
    const rootPropertyEntries = Object.entries(root)
    for(const [$rootPropertyKey, $rootPropertyValue] of rootPropertyEntries) {
      if($rootPropertyValue instanceof Content) { $rootPropertyValue.delete() }
      delete root[$rootPropertyKey]
    }
    return undefined
  }
}