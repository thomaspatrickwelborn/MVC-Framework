export default function FromEntries(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object[$trapPropertyName](
          Object.entries(root)
        )
      }
    }
  )
}