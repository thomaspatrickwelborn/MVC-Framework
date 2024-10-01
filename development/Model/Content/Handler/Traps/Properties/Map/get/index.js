export default function Get(
  $trap, $trapPropertyName, $aliases
) {
  const {
    $eventTarget, 
    root, 
    rootAlias, 
  } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function ($key) {
        return root.get($key)
      },
    }
  )
}
