import DETEvent from '../../../../../DynamicEvent/index.js'
import DETEventBubble from '../../../../../DynamicEvent/DynamicEventBubble/index.js'
export default function Reverse(
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
    'reverse', DETEventBubble
  )
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        Array.prototype.reverse.call($root, ...arguments)
        $eventTarget.dispatchEvent(
          new DETEvent(
            'reverse',
            {
              basename: $basename,
              path: $path,
              detail: {
                reference: $root
              },
            }
          )
        )
        return $root
      }
    }
  )
}