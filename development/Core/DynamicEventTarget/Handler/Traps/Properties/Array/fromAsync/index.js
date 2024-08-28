export default function FromAsync(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.fromAsync.call(root, root, ...arguments)
      },
    }
  )
}