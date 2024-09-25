export default function HasOwn(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      get() {
        return Object.hasOwn(root, ...arguments)
      },
      set($method) {
        root[$method] = $method
      },
    }
  )
}