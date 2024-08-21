export default function CopyWithin(
  $trap, $trapPropertyName, $aliases
) {
  const {
    $eventTarget, 
    $root, 
    $rootAlias, 
    $basename,
    $path, 
  } = $aliases
  $eventTarget.addEventListener(
    'copyWithin', 
    ($event) => {
      if($eventTarget.parent !== null) {
        const copyWithinEventData = {
          basename: $event.basename,
          path: $event.path,
          target: $event.detail.target,
          start: $event.detail.start,
          end: $event.detail.end,
          items: $event.detail.items,
        }
        $trap.createEvent(
          $eventTarget.parent,
          'copyWithin',
          copyWithinEventData,
        )
      }
    }
  )
  $eventTarget.addEventListener(
    'copyWithinIndex', 
    ($event) => {
      if($eventTarget.parent !== null) {
        const copyWithinIndexEventData = {
          basename: $event.basename,
          path: $event.path,
          target: $event.detail.target,
          start: $event.detail.start,
          end: $event.detail.end,
          item: $event.detail.item,
        }
        $trap.createEvent(
          $eventTarget.parent,
          'copyWithinIndex', 
          copyWithinIndexEventData,
        )
      }
    }
  )
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
        iterateCopyIndex: 
        while(copyIndex < end) {
          const copyItem = $root[copyIndex]
          copiedItems.push(copyItem)
          Array.prototype.copyWithin.call(
            $root,
            targetIndex,
            copyIndex,
            copyIndex + 1
          )
          // Array Copy Within Index Event Data
          const copyWithinIndexEventData = {
            basename: $eventTarget.basename,
            path: $eventTarget.path,
            target: targetIndex,
            start: copyIndex,
            end: copyIndex + 1,
            item: copyItem,
          }
          // Array Copy Within Index Event
          $trap.createEvent(
            $eventTarget,
            'copyWithinIndex', 
            copyWithinIndexEventData,
          )
          copyIndex++
          targetIndex++
        }
        // Array Copy Within Event Data
        const copyWithinEventData = {
          basename: $eventTarget.basename,
          path: $eventTarget.path,
          target: target,
          start: start,
          end: end,
          items: copiedItems,
        }
        // Array Copy Within Event
        $trap.createEvent(
          $eventTarget,
          'copyWithin',
          copyWithinEventData,
        )
      }
    }
  )
}