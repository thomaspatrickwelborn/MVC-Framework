export default function Includes(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.includes.call(root, ...arguments)
      }
    }
  )
}