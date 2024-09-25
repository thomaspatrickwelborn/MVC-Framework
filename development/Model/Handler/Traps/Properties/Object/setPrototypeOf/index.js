import {
  typeOf,
  isDirectInstanceOf,
} from '../../../../../../Coutil/index.js'
import ModelEvent from '../../../../../ModelEvent/index.js'
export default function SetPrototypeOf(
  $trap, $trapPropertyName, $aliases
) {
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
  } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function () {
        const prototype = arguments[0]
        Object.setPrototypeOf(root, prototype)
        eventTarget.dispatchEvent(
          new ModelEvent(
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