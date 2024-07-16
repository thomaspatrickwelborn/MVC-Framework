export default function GetPrototypeOf(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.getPrototypeOf($root)
      }
    }
  )
}