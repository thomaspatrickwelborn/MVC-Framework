export default function Seal(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function () {
        Object.seal($root)
        $trap.createEvent(
          $eventTarget,
          'seal',
          {},
          $root
        )
        return $root
      }
    }
  )
}