export default function Set(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function ($key, $val) {
        $root.set($key, $val)
        $trap.createEvent(
          $eventTarget,
          'set',
          {
            key: $key,
            val: $val,
          },
        )
        $trap.createEvent(
          $eventTarget,
          'setKey',
          {
            key: $key,
            val: $val,
          },
        )
        return $root
      },
    }
  )
}
