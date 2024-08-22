export default function Splice(
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
    'spliceDelete', 
    ($event) => {
      if($eventTarget.parent !== null) {
        const spliceDeleteEventData = {
          path: $event.path,
          basename: $event.basename,
          index: $event.detail.index,
          deleteIndex: $event.detail.deleteIndex,
          deleteItem: $event.detail.deleteItem,
        }
        $trap.createEvent(
          $eventTarget.parent,
          'spliceDelete',
          spliceDeleteEventData,
        )
      }
    }
  )
  $eventTarget.addEventListener(
    'spliceAdd', 
    ($event) => {
      if($eventTarget.parent !== null) {
        const spliceAddEventData = {
          path: $event.path,
          basename: $event.basename,
          index: $event.detail.index,
          addIndex: $event.detail.addIndex,
          addItem: $event.detail.addItem,
        }
        $trap.createEvent(
          $eventTarget.parent,
          'spliceAdd',
          spliceAddEventData,
        )
      }
    }
  )
  $eventTarget.addEventListener(
    'splice', 
    ($event) => {
      if($eventTarget.parent !== null) {
        const spliceEventData = {
          basename: $event.basename,
          path: $event.path,
          start: $event.detail.start,
          deleted: $event.detail.deleted,
          added: $event.detail.added,
          length: $event.detail.length,
        }
        $trap.createEvent(
          $eventTarget.parent,
          'splice',
          spliceEventData,
        )
      }
    }
  )
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
          const basename = deleteItemsIndex
          const path = (
            $path !== null
          ) ? $path.concat('.', deleteItemsIndex)
            : deleteItemsIndex
          $trap.createEvent(
            $eventTarget,
            'spliceDelete',
            {
              basename,
              path,
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
          const basename = addItemsIndex
          const path = (
            $path !== null
          ) ? $path.concat('.', addItemsIndex)
            : addItemsIndex
          // Array Splice Add Event
          $trap.createEvent(
            $eventTarget,
            'spliceAdd',
            {
              basename,
              path,
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
            basename: $basename,
            path: $path,
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