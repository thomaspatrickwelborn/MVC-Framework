export default function Shift(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const shiftElement = Array.prototype.shift.call($root)
        const shiftElementIndex = 0
        // Array Shift Event
        $trap.createEvent(
          $eventTarget,
          'shift',
          {
            element: shiftElement,
            elementIndex: shiftElementIndex,
          }
        )
        return shiftElement
      }
    }
  )
}