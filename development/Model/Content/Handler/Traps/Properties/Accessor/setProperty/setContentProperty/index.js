import Content from '../../../../../../index.js'
import { ContentEvent } from '../../../../../../Events/index.js'
export default function SetContentProperty($content, $options) {
  const { radicle, root, basename, path, schema } = $content
  console.log('schema', schema)
  return function setContentProperty() {
    // Arguments
    const $path = arguments[0]
    const $value = arguments[1]
    // Options
    const ulteroptions = Object.assign({}, $options, arguments[2] || {})
    const contentOptions = Object.assign(
      {}, $content.options, { traps: { accessor: { set: ulteroptions } }}
    )
    const { recursive, events, pathkey, pathsep, pathesc } = ulteroptions
    // Property Value
    let propertyValue
    // Property Value: Content Instance
    if($value instanceof Content) {
      propertyValue = $value
    }
    // Property Value: New Content Instance
    else if(typeof $value === 'object') {
      propertyValue = new Content(
        $value, contentOptions
      )
    }
    // Property Value: Primitive Literal
    else { propertyValue = $value }
    // Path Key: true
    if(pathkey === true) {
      let path = $path.split(new RegExp(/\.(?=(?:[^"]*"[^"]*")*[^"]*$)/))
      const basename = path.pop()
      // Get Target
      let target = root
      let targetIsRoot = true
      let targetIsContent = false
      iterateSubpaths: 
      for(const $subpath of path) {
        targetIsRoot = (target === root)
        targetIsContent = (target.eventTarget instanceof Content)
        // Target: Root
        if(targetIsRoot) {
          target = target[$subpath]
        }
        // Target: Content
        else if(targetIsContent) {
          target = target.get($subpath, ulteroptions)
        }
        // Recursive: true
        // Target: Undefined
        if(recursive && target === undefined) {
          // Target: New Content Instance
          const nextarget = new Content(propertyValue, contentOptions)
          // Target: Root
          if(targetIsRoot) {
            target = target[$subpath] = nextarget
          }
          // Target: Content Instance
          else if(targetIsContent) {
            target = target.set($subpath, nextarget, ulteroptions)
          }
        }
      }
      // Target: Undefined Return
      if(target === undefined) return
      // Target: Root Set Property Value
      if(targetIsRoot) { target[basename] = propertyValue }
      // Target: Content Set Property Value
      else if(targetIsContent) { target.set(basename, propertyValue, ulteroptions) }
    }
    // Path Key: false
    else if(pathkey === false) {
      root[basename] = propertyValue
    }
    // Return Property Value
    return propertyValue
  }
}