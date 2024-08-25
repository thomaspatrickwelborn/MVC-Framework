import DETEvent from '../../../../../DynamicEvent/index.js'
import DETEventBubble from '../../../../../DynamicEvent/DynamicEventBubble/index.js'
export default function Set(
  $trap, $trapPropertyName, $aliases
) {
  const {
    $eventTarget, 
    $root, 
    $rootAlias, 
    $basename,
    $path, 
  } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function ($key, $val) {
        $root.set($key, $val)
        $eventTarget.dispatchEvent(
          new DETEvent(
            'set',
            {
              basename: $basename,
              path: $path,
              detail: {
                key: $key,
                val: $val,
              },
            },
          )
        )
        $eventTarget.dispatchEvent(
          new DETEvent(
            'setKey',
            {
              basename: $basename,
              path: $path,
              detail: {
                key: $key,
                val: $val,
              },
            },
          )
        )
        return $root
      },
    }
  )
}
