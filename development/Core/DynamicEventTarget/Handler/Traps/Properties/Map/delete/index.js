import DETEvent from '../../../../../DynamicEvent/index.js'
import DETEventBubble from '../../../../../DynamicEvent/DynamicEventBubble/index.js'
export default function Delete(
  $trap, $trapPropertyName, $aliases
) {
  const {
    $eventTarget, 
    $root, 
    $rootAlias, 
    $basename,
    $path, 
  } = $aliases
  $eventTarget.addEventListener(
    'delete', DETEventBubble
  )
  $eventTarget.addEventListener(
    'deleteKey', DETEventBubble
  )
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function ($key) {
        const resolve = $root.delete($key)
        $eventTarget.dispatchEvent(
          new DETEvent(
            'delete',
            {
              basename: $basename,
              path: $path,
              detail: {
                key: $key,
              }
            }
          )
        )
        $eventTarget.dispatchEvent(
          new DETEvent(
            'deleteKey',
            {
              basename: $basename,
              path: $path,
              detail: {
                key: $key,
              }
            }
          )
        )
        return resolve
      },
    }
  )
}
