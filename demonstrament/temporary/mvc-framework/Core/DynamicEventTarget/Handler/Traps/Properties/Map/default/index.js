export default function Default(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      get() {
        if(typeof $root[$trapPropertyName] === 'function') {
          return function () {
            return $root[$trapPropertyName](...arguments)
          }
        }
        return $root[$trapPropertyName]
      },
      set($value) {
        $root[$trapPropertyName] = $value
      },
    }
  )
}