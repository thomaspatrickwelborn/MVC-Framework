export default function Splice(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $this, $arrayPrototypePropertyName, {
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
          const deleteItem = $root.splice(start, 1)[0]
          deleteItems.push(deleteItem)
          // Array Splice Delete Event
          $this.createEvent(
            $eventTarget,
            'spliceDelete',
            {
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
          $root.splice(
            start + addItemsIndex, 0, addItem
          )
          // Array Splice Add Event
          $this.createEvent(
            $eventTarget,
            'spliceAdd',
            {
              addIndex: addItemsIndex,
              addItem: addItem,
            },
          )
          addItemsIndex++
        }
        // Array Splice Event
        $this.createEvent(
          $eventTarget,
          'splice',
          {
            start,
            deleted: deleteItems,
            added: addItems,
          },
        )
        return deleteItems
      }
    }
  )
}