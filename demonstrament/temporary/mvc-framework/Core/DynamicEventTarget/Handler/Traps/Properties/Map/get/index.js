export default function Get(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function ($key) {
        const val = $root.get($key)
        console.log('val', val)
        $trap.createEvent(
          $eventTarget,
          'get',
          {
            key: $key,
            val
          },
        )
        $trap.createEvent(
          $eventTarget,
          'getKey',
          {
            key: $key,
            val
          },
        )
        return val
      },
    }
  )
}
