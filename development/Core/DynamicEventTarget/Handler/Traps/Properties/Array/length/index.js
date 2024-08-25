import DETEvent from '../../../../../DynamicEvent/index.js'
import DETEventBubble from '../../../../../DynamicEvent/DynamicEventBubble/index.js'
export default function Length(
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
    'lengthSet', DETEventBubble
  )
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      get() { return $root.length },
      set($length) {
        $root.length = $length
        $eventTarget.dispatchEvent(
          new DETEvent(
            'lengthSet', 
            {
              path: $path,
              basename: $basename,
              detail: {
                length: $root.length,
              },
            }
          )
        )
      },
    }
  )
}