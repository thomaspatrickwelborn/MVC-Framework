import { ContentEvent } from '../../../../../Events/index.js'
export default function Set(
  $trap, $trapPropertyName, $aliases
) {
  const {
    $eventTarget, 
    root, 
    basename,
    path, 
  } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function ($key, $val) {
        root.set($key, $val)
        $eventTarget.dispatchEvent(
          new ContentEvent(
            'set',
            {
              basename,
              path,
              detail: {
                key: $key,
                val: $val,
              },
            },
            $eventTarget
          )
        )
        $eventTarget.dispatchEvent(
          new ContentEvent(
            'setKey',
            {
              basename,
              path,
              detail: {
                key: $key,
                val: $val,
              },
            },
            $eventTarget
          )
        )
        return root
      },
    }
  )
}
