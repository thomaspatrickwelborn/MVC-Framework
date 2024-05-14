export default function Set(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases

  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function () {
      },
    }
  )
}
