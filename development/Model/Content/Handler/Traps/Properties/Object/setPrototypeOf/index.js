import {
  typeOf,
  isDirectInstanceOf,
} from '../../Coutil/index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function SetPrototypeOf(
  $trap, $trapPropertyName, $aliases
) {
  const {
    eventTarget, 
    root, 
    basename,
    path, 
  } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function () {
        const prototype = arguments[0]
        Object.setPrototypeOf(root, prototype)
        eventTarget.dispatchEvent(
          new ContentEvent(
            'setPrototypeOf',
            {
              basename,
              path,
              detail: {
                prototype
              },
            },
            eventTarget
          )
        )
        return root
      }
    }
  )
}