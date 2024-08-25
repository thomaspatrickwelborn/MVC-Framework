import {
  typeOf,
  isDirectInstanceOf,
} from '../../Coutil/index.js'
import DETEvent from '../../../../../DynamicEvent/index.js'
import DETEventBubble from '../../../../../DynamicEvent/DynamicEventBubble/index.js'
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
    'setPrototypeOf', DETEventBubble
  )
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function () {
        const prototype = arguments[0]
        Object.setPrototypeOf($root, prototype)
        $eventTarget.dispatchEvent(
          new DETEvent(
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