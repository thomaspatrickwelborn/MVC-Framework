export default function ToLocaleString(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      get() {
        return $root['toLocaleString'](...arguments)
      },
      set($method) {
        $root[$method] = $method
      },
    }
  )
}