export default function FindLastIndex(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.findLastIndex.call(root, ...arguments)
      }
    }
  )
}