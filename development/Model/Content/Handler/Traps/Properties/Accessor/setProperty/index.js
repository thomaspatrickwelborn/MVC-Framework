import { Content } from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function SetProperty($content, $options) {
  const { eventTarget, root, basename, path } = $content
  return function setProperty() {
    const { proxy } = eventTarget
    // Set Content Invocation
    if((
      // Unulteroptions
      arguments.length === 1 &&
      typeof arguments[0] === 'object'
    ) || (
      // Ulteroptions
      arguments.length === 2 &&
      typeof arguments[0] === 'object' &&
      typeof arguments[1] === 'object'
    )) {
      // Arguments
      const $value = arguments[0]
      const ulteroptions = Object.assign({}, $options, arguments[1])
      // Delete Preterproperties
      proxy.delete()
      // Set Anterproperties
      const {
        recursive, events, pathKey, pathSep, pathEsc
      } = ulteroptions.traps.accessor.set
      const rootEntries = Object.entries(root)
      for(const [$key, $value] of rootEntries) {
        let value
        if(typeof $value === 'object') { value = new Content($value, $options)}
        else { value = $value }
        root[$key] = $value
      }
    }
    // Set Content Property Invocation
    else if((
      // Unulteroptions
      arguments.length === 2 &&
      typeof arguments[0] === 'string'
    ) || (
      // Ulteroptions
      arguments.length === 3 &&
      typeof arguments[0] === 'string' &&
      typeof arguments[2] === 'object'
    )) {
      // Arguments
      const $path = arguments[0]
      const $value = arguments[1]
      const ulteroptions = Object.assign(
        $options, arguments[2]?.traps?.accessor?.set || {}
      )
      const { recursive, events, pathKey, pathSep, pathEsc } = ulteroptions
    }
  }
}