import DETEvent from '../../../../../DynamicEvent/index.js'
import DETEventBubble from '../../../../../DynamicEvent/DynamicEventBubble/index.js'
export default function Clear(
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
    'clear', DETEventBubble
  )
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function ($key) {
        const resolve = $root.clear($key)
        $eventTarget.dispatchEvent(
          'clear',
          {},
        )
      },
    }
  )
}
