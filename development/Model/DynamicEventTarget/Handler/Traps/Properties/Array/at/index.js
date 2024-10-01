export default function At(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.pop.call(root, ...arguments)
      }
    }
  )
}