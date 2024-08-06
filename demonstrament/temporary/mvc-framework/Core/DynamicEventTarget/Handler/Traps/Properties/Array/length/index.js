export default function Length(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      get() {
        return $root.length
      },
      set($length) {
        $root.length = $length
        // Array Length Set Event
        $trap.createEvent(
          $eventTarget,
          'lengthSet',
          {
            length: $root.length,
          }
        )
      }
    }
  )
}