import { ContentEvent } from '../../../../../Events/index.js'
export default function DeleteProperty(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options
  const { eventTarget, root, basename, path } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function($path) {
        const { proxy } = eventTarget
        const paths = (arguments.length === 0)
          ? Object.keys(proxy)
          : (arguments.length === 1)
            ? [...arguments]
            : []
        iteratePaths: 
        for(let $path of paths) {
          const pathSegments = $path.split('.')
          const pathRootSegment = pathSegments.shift()
          console.log('pathRootSegment', pathRootSegment)
          console.log('proxy', proxy)
          console.log(`proxy["${pathRootSegment}"]`, proxy[pathRootSegment])
          if(pathSegments.length) {
            return proxy[pathRootSegment].delete(pathSegments.join('.'))
          }
          delete root[pathRootSegment]
          const value = delete proxy[pathRootSegment]
          if(events.includes('delete')) {
            eventTarget.dispatchEvent(
              new ContentEvent('delete', {
                basename, 
                path, 
                detail: {
                  property: $path,
                  value: value,
                },
              }, eventTarget)
            )
          }
        }
      }
    }
  )
}