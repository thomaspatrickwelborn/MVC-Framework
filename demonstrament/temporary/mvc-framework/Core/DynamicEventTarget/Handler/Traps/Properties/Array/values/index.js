export default function Values(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.values.call($root, ...arguments)
      }
    }
  )
}