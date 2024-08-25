import {
  typeOf,
  isDirectInstanceOf,
} from '../../Coutil/index.js'
import DETEvent from '../../../../../DynamicEvent/index.js'
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
            $eventTarget
          )
        )
        return $root
      }
    }
  )
}