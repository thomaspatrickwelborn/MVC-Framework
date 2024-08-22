import {
  DynamicEvent,
  DynamicEventBubble,
} from '../../../Events/index.js'
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
    'reverse', DynamicEventBubble
  )
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        Array.prototype.reverse.call($root, ...arguments)
        $eventTarget.dispatchEvent(
          new DynamicEvent(
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