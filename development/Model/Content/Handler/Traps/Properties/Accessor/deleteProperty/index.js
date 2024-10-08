import { ContentEvent } from '../../../../../Events/index.js'
export default function DeleteProperty(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options
  const { eventTarget, root, basename, path } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function($path) {
        const pathSegments = $path.split('.')
        const rootPathSegment = pathSegments.shift()
        if(pathSegments.length) {
          return root[rootPathSegment].delete(pathSegments.join('.'))
        }
        const value = delete root[rootPathSegment]
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
  )
}