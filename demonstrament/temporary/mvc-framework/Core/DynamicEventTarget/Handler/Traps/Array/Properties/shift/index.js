export default function Shift(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const shiftElement = $root.shift()
        const shiftElementIndex = 0
        // Array Shift Event
        $this.createEvent(
          $eventTarget,
          'shift',
          {
            element: shiftElement,
            elementIndex: shiftElementIndex,
          }
        )
      }
    }
  )
}