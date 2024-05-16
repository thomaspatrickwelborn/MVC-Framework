export default function SetPrototypeOf(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function () {
        Object.setPrototypeOf($root)
        $trap.createEvent(
          $eventTarget,
          'setPrototypeOf',
          {},
          $root
        )
        return $root
      }
    }
  )
}