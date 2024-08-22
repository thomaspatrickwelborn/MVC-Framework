import {
  DynamicEvent,
  DynamicEventBubble,
} from '../../../Events/index.js'
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
    'clear', DynamicEventBubble
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
