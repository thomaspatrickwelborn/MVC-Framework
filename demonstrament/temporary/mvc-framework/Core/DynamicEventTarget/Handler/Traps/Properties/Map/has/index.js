export default function Has(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Map.prototype.has.call($root, ...arguments)
      }
    }
  )
}