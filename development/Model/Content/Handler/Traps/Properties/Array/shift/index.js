import { ContentEvent } from '../../../../../Events/index.js'
export default function Shift(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options
  const {
    eventTarget, 
    root, 
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
        if(events.includes('shift')) {
          eventTarget.dispatchEvent(
            new ContentEvent(
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
        }
        return shiftElement
      }
    }
  )
}