export default function GroupBy(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Map.groupBy(root, ...arguments)
      }
    }
  )
}