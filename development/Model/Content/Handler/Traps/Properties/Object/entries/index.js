export default function Entries(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.entries(root)
      }
    }
  )
}