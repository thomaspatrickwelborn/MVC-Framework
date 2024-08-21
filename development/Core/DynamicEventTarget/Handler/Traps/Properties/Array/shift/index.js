export default function Shift(
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
    'shift', 
    ($event) => {
      if($eventTarget.parent !== null) {
        const shiftEventData = {
          path: $event.path,
          basename: $event.basename,
          element: $event.detail.element,
          elementIndex: $event.detail.elementIndex,
        }
        $trap.createEvent(
          $eventTarget.parent,
          'shift',
          shiftEventData,
        )
      }
    }
  )
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const shiftElement = Array.prototype.shift.call($root)
        const shiftElementIndex = 0
        const basename = shiftElementIndex
        const path = (
          $path !== null
        ) ? $path.concat('.', shiftElementIndex)
          : shiftElementIndex
        // Array Shift Event
        $trap.createEvent(
          $eventTarget,
          'shift',
          {
            basename,
            path,
            element: shiftElement,
            elementIndex: shiftElementIndex,
          }
        )
        return shiftElement
      }
    }
  )
}