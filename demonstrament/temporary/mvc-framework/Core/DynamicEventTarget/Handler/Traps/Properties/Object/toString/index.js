export default function ToString(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      get() {
        return $root['toString'](...arguments)
      },
      set($method) {
        $root[$method] = $method
      },
    }
  )
}