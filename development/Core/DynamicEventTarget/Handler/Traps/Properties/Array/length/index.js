import {
  DynamicEvent,
  DynamicEventBubble,
} from '../../../Events/index.js'
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
    'lengthSet', DynamicEventBubble
  )
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      get() { return $root.length },
      set($length) {
        $root.length = $length
        $eventTarget.dispatchEvent(
          new DynamicEvent(
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