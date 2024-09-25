import ModelEvent from '../../../../../ModelEvent/index.js'
export default function Set(
  $trap, $trapPropertyName, $aliases
) {
  const {
    $eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
  } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function ($key, $val) {
        root.set($key, $val)
        $eventTarget.dispatchEvent(
          new ModelEvent(
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
          new ModelEvent(
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
