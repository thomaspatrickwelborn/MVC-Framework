export default function GetOwnPropertyDescriptors(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.getOwnPropertyDescriptors($root)
      }
    }
  )
}