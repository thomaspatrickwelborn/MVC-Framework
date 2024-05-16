export default function From(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.from.call($root, $root, ...arguments)
      },
    }
  )
}