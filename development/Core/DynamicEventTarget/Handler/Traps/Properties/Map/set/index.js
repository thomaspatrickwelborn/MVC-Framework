import {
  DynamicEvent,
  DynamicEventBubble,
} from '../../../Events/index.js'
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
          new DynamicEvent(
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
          new DynamicEvent(
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
