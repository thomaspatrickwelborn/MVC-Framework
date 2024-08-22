import {
  typeOf,
  isDirectInstanceOf,
  parseDEBD,
} from '../../Coutil/index.js'
import DynamicEvent from '../../../Events/DynamicEvent/index.js'
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
    'setPrototypeOf', 
    ($event) => {
      if($eventTarget.parent !== null) {
        $eventTarget.parent.dispatchEvent(
          new DynamicEvent(
            ...parseDEBD($event)
          )
        )
      }
    }
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