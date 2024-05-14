export default function Freeze(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function () {
        Object.freeze($root)
        $trap.createEvent(
          $eventTarget,
          'freeze',
          {},
          $root
        )
        return $root
      }
    }
  )
}