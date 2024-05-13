export default function Default(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      get() {
        if(typeof $root[$arrayPrototypePropertyName] === 'function') {
          return function () {
            return $root[$arrayPrototypePropertyName](...arguments)
          }
        }
        return $root[$arrayPrototypePropertyName]
      },
      set($value) {
        $root[$arrayPrototypePropertyName] = $value
      },
    }
  )
}