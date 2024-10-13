import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function SetProperty($content, $options) {
  console.log(
    "\n", "------------",
    "\n", "Set Property",
    "\n", "------------",
  )
  const { radicle, root, basename, path } = $content
  return function setProperty() {
    const { proxy } = $content
    // -----------------------------
    // Set Content Method Invocation
    // -----------------------------
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
      const ulteroptions = Object.assign({}, $options, arguments[1] || {})
      // Delete Preterproperties
      proxy.delete()
      const { recursive, events, pathkey, pathsep, pathesc } = ulteroptions
      // Set Anterproperties
      const properties = Object.entries($value)
      iterateProperties: 
      for(const [$propertyKey, $propertyValue] of properties) {
        // Property Value
        let propertyValue
        // Property Value: Content Instance
        if($propertyValue instanceof Content) {
          propertyValue = $propertyValue
        }
        // Property Value: New Content Instance
        else if(typeof $propertyValue === 'object') {
          propertyValue = new Content(
            $propertyValue, { traps: { accessor: { set: ulteroptions } }}
          )
        }
        // Property Value: Primitive Literal
        else { propertyValue = $propertyValue }
        // Radicle Property: Unmodified Value
        radicle[$propertyKey] = $propertyValue
        // Root Property: Modified Value
        root[$propertyKey] = propertyValue
      }
      // Return Proxy
      return proxy
    }
    // --------------------------------------
    // Set Content Property Method Invocation
    // --------------------------------------
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
      // Ulteroptions
      const ulteroptions = Object.assign({}, $options, arguments[2] || {})
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
          $value, { traps: { accessor: { set: arguments[1] } }}
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
            const nextarget = new Content(propertyValue, $options)
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
}