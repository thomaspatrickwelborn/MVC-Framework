import DETEvent from '../../../../../DynamicEvent/index.js'
export default function Length(
  $trap, $trapPropertyName, $aliases
) {
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
  } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      get() { return root.length },
      set($length) {
        root.length = $length
        eventTarget.dispatchEvent(
          new DETEvent(
            'lengthSet', 
            {
              path,
              basename,
              detail: {
                length: root.length,
              },
            },
            eventTarget
          )
        )
      },
    }
  )
}