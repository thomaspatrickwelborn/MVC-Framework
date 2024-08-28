export default function IsExtensible(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.isExtensible(root)
      }
    }
  )
}