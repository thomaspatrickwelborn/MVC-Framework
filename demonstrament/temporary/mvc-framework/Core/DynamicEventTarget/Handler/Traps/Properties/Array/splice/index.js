export default function Splice(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $arguments = [...arguments]
        const start = (
          $arguments[0] >= 0
        ) ? $arguments[0]
          : $root.length + $arguments[0]
        const deleteCount = (
          $arguments[1] <= 0
        ) ? 0
          : (
          $arguments[1] === undefined ||
          start + $arguments[1] >= $root.length
        ) ? $root.length - start
          : $arguments[1]
        const addItems = $arguments.slice(2)
        const addCount = addItems.length
        const deleteItems = []
        let deleteItemsIndex = 0
        spliceDelete:
        while(deleteItemsIndex < deleteCount) {
          const deleteItem = Array.prototype.splice.call($root, start, 1)[0]
          deleteItems.push(deleteItem)
          // Array Splice Delete Event
          $trap.createEvent(
            $eventTarget,
            'spliceDelete',
            {
              index: start + deleteItemsIndex,
              deleteIndex: deleteItemsIndex,
              deleteItem: deleteItem,
            },
          )
          deleteItemsIndex++
        }
        let addItemsIndex = 0
        spliceAdd: 
        while(addItemsIndex < addCount) {
          const addItem = addItems[addItemsIndex]
          Array.prototype.splice.call(
            $root, start + addItemsIndex, 0, addItem
          )
          // Array Splice Add Event
          $trap.createEvent(
            $eventTarget,
            'spliceAdd',
            {
              index: start + addItemsIndex,
              addIndex: addItemsIndex,
              addItem: addItem,
            },
          )
          addItemsIndex++
        }
        // Array Splice Event
        $trap.createEvent(
          $eventTarget,
          'splice',
          {
            start,
            deleted: deleteItems,
            added: addItems,
            length: $root.length,
          },
        )
        return deleteItems
      }
    }
  )
}