import Content from '../../../../../../index.js'
import { ContentEvent } from '../../../../../../Events/index.js'
export default function DeleteContentProperty($content, $options) {
  const { root, basename, path } = $content
  return function deleteContentProperty() {
    const { proxy } = $content
    // Arguments
    const $path = arguments[0]
    const ulteroptions = Object.assign(
      $options, arguments[1] || {}
    )
    const { recursive, events, pathKey, pathSep, pathEsc } = ulteroptions
    // Path Key: true
    if(pathkey === true) {
      let path = $path.split(new RegExp(/\.(?=(?:[^"]*"[^"]*")*[^"]*$)/))
      const basename = path.pop()
      let target = root
      let targetIsRoot = true
      let targetIsContent = false
      // Iterate Subpaths
      iterateSubpaths: 
      for(const $subpath of path) {
        targetIsRoot = (target === root)
        targetIsContent = (target.Class === Content)
        // Target: Root
        if(targetIsRoot) {
          target = target[$subpath]
        }
        // Target: Content
        else if(targetIsContent) { target = target.get($subpath, ulteroptions) }
      }
      // Target: Undefined Return
      if(target === undefined) return
      // Target: Root Set Property Value
      if(targetIsRoot) { delete target[basename] }
      // Target: Content Set Property Value
      else if(targetIsContent) { target.delete(basename, ulteroptions) }
    }
    // Path Key: false
    else if(pathkey === false) {
      let path = $path
      delete root[path]
    }
    return undefined
  }
}