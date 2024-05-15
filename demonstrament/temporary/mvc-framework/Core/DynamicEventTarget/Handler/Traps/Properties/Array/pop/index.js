export default function Pop(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const popElement = Array.prototype.pop.call($root)
        const popElementIndex = $root.length - 1
        // Array Pop Event
        $trap.createEvent(
          $eventTarget,
          'pop',
          {
            element: popElement,
            elementIndex: popElementIndex,
          }
        )
        return popElement
      }
    }
  )
}