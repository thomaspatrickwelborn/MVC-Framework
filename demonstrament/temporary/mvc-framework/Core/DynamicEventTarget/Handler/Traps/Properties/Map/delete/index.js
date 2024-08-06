export default function Delete(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function ($key) {
        const resolve = $root.delete($key)
        $trap.createEvent(
          $eventTarget,
          'delete',
          {
            key: $key,
          },
        )
        $trap.createEvent(
          $eventTarget,
          'deleteKey',
          {
            key: $key,
          },
        )
        return resolve
      },
    }
  )
}
