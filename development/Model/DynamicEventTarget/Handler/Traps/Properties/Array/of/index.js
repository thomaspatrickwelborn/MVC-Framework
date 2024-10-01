export default function Of(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.of.call(
          root, ...Object.values(root)
        )
      },
    }
  )
}