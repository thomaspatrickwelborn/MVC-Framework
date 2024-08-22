import {
  DynamicEvent,
  DynamicEventBubble,
} from '../../../Events/index.js'
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
    'delete', DynamicEventBubble
  )
  $eventTarget.addEventListener(
    'deleteKey', DynamicEventBubble
  )
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function ($key) {
        const resolve = $root.delete($key)
        $eventTarget.dispatchEvent(
          new DynamicEvent(
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
          new DynamicEvent(
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
