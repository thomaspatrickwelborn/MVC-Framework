import { Content } from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function DeleteProperty($content, $options) {
  const { eventTarget, root, basename, path } = $content
  return function deleteProperty() {
    const { proxy } = eventTarget
    // Delete Content Invocation
    if((
      // Unulteroptions
      arguments.length === 0
    ) || (
      // Ulteroptions
      arguments.length === 1 &&
      typeof arguments[0] === 'object'
    )) {
      // Arguments
      const ulteroptions = Object.assign(
        $options, arguments[1]?.traps?.accessor?.delete || {}
      )
      const { recursive, events, pathKey, pathSep, pathEsc } = ulteroptions
      const rootEntries = Object.entries(root)
      for(const [$key, $value] of rootEntries) {
        // 
      }
    }
    // Delete Content Property Invocation
    else if((
      // Unulteroptions
      arguments.length === 1
    ) || (
      // Ulteroptions
      arguments.length === 2 &&
      typeof arguments[1] === 'object'
    )) {
      // Arguments
      const $path = arguments = 0
      const ulteroptions = Object.assign(
        $options, arguments[1]?.traps?.accessor?.delete || {}
      )
      const { recursive, events, pathKey, pathSep, pathEsc } = ulteroptions
    }
  }
}