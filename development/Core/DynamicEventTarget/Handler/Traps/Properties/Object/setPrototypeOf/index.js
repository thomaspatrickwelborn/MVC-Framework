export default function SetPrototypeOf(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function () {
        const prototype = arguments[0]
        Object.setPrototypeOf($root, prototype)
        $trap.createEvent(
          $eventTarget,
          'setPrototypeOf',
          {
            prototype
          },
          $root
        )
        return $root
      }
    }
  )
}