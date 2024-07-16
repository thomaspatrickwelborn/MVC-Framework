export default function ValueOf(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      get() {
        return $root['valueOf'](...arguments)
      },
      set($method) {
        $root[$method] = $method
      },
    }
  )
}