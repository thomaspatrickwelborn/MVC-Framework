import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function GetProperty($content, $options) {
  const { radicle, root, basename, path } = $content
  return function getProperty() {
    const { proxy } = $content
    // Get Content Invocation
    if((
      // Unulteroptions
      arguments.length === 0
    ) || (
      // Ulteroptions
      arguments.length === 1 &&
      typeof arguments[0] === 'object'
    )) {
      const { events } = ulteroptions.traps.accessor.get
      return proxy
    }
    // Get Content Property Invocation
    else if((
      // Unulteroptions
      arguments.length === 1 &&
      typeof arguments[0] === 'string'
    ) || (
      // Ulteroptions
      arguments.length === 2 &&
      typeof arguments[0] === 'string' &&
      typeof arguments[1] === 'object'
    )) {
      // Arguments
      const $path = arguments[0]
      const ulteroptions = Object.assign(
        $options, arguments[1]?.traps?.accessor?.get || {}
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
}