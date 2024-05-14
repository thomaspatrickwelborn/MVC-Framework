export default function Fill(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $arguments = [...arguments]
        const value = $arguments[0]
        const start = (
          $arguments[1] >= 0
        ) ? $arguments[1]
          : $root.length + $arguments[1]
        const end = (
          $arguments[2] >= 0
        ) ? $arguments[2]
          : $root.length + $arguments[2]
        let fillIndex = start
        while(
          fillIndex < $root.length &&
          fillIndex < end
        ) {
          $root.fill(value, fillIndex, fillIndex + 1)
          // Array Fill Index Event
          $trap.createEvent(
            $eventTarget,
            'fillIndex',
            {
              start: fillIndex,
              end: fillIndex + 1,
              value,
            },
          )
          fillIndex++
        }
        // Array Fill Event
        $trap.createEvent(
          $eventTarget,
          'fill',
          { start, end, value },
        )
        return $root
      }
    }
  )
}