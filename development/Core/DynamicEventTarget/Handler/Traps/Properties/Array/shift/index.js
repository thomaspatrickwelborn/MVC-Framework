import DETEvent from '../../../../../DynamicEvent/index.js'
export default function Shift(
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
      value: function() {
        const shiftElement = Array.prototype.shift.call(root)
        const shiftElementIndex = 0
        const basename = shiftElementIndex
        const path = (
          path !== null
        ) ? path.concat('.', shiftElementIndex)
          : shiftElementIndex
        // Array Shift Event
        eventTarget.dispatchEvent(
          new DETEvent(
            'shift',
            {
              basename,
              path,
              detail: {
                element: shiftElement,
                elementIndex: shiftElementIndex,
              },
            },
            eventTarget
          )
        )
        return shiftElement
      }
    }
  )
}