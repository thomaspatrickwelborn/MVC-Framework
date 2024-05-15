export default function FindLastIndex(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.findLastIndex.call($root, ...arguments)
      }
    }
  )
}