export default function Clear(
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
