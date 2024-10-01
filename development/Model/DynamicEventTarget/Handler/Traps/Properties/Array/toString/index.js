export default function ToString(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.toString.call(root, ...arguments)
      }
    }
  )
}