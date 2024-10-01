export default function PropertyIsEnumerable(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.prototype.propertyIsEnumerable.call(
          root, ...arguments
        )
      }
    }
  )
}