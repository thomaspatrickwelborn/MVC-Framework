import {
  typeOf,
  isDirectInstanceOf,
} from '../../Coutil/index.js'
import {
  DynamicEvent,
  DynamicEventBubble,
} from '../../../Events/index.js'
export default function SetPrototypeOf(
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
    'setPrototypeOf', DynamicEventBubble
  )
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function () {
        const prototype = arguments[0]
        Object.setPrototypeOf($root, prototype)
        $eventTarget.dispatchEvent(
          new DynamicEvent(
            'setPrototypeOf',
            {
              basename: $basename,
              path: $path,
              detail: {
                prototype
              },
            },
          )
        )
        return $root
      }
    }
  )
}