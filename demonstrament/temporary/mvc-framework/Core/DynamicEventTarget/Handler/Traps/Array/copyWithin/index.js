export default function CopyWithin(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $arguments = [...arguments]
        const target = (
          arguments[0] >= 0
        ) ? arguments[0]
          : $root.length = arguments[0]
        const start = (
          arguments[1] >= 0
        ) ? arguments[1]
          : $root.length + arguments[1]
        const end = (
          arguments[2] === undefined
        ) ? $root.length
          : (
          arguments[2] >= 0
        ) ? arguments[2]
          : $root.length + arguments[2]
        const copiedItems = []
        let copyIndex = start
        let targetIndex = target
        while(copyIndex < end) {
          const copyItem = $root[copyIndex]
          copiedItems.push(copyItem)
          $root.copyWithin(
            targetIndex,
            copyIndex,
            copyIndex + 1
          )
          // Array Copy Within Index Event
          $trap.createEvent(
            $eventTarget,
            'copyWithinIndex', {
              target: targetIndex,
              start: copyIndex,
              end: copyIndex + 1,
              item: copyItem,
            }
          )
          copyIndex++
          targetIndex++
        }
        // Array Copy Within Event
        $trap.createEvent(
          $eventTarget,
          'copyWithin', {
            target: target,
            start: start,
            end: end,
            items: copiedItems,
          }
        )
      }
    }
  )
}