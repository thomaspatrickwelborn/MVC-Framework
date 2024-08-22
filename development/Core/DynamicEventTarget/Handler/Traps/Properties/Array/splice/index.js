import {
  DynamicEvent,
  DynamicEventBubble,
} from '../../../Events/index.js'
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
    'spliceDelete', DynamicEventBubble
  )
  $eventTarget.addEventListener(
    'spliceAdd', DynamicEventBubble
  )
  $eventTarget.addEventListener(
    'splice', DynamicEventBubble
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
          $eventTarget.dispatchEvent(
            new DynamicEvent(
              'spliceDelete',
              {
                basename,
                path,
                detail: {
                  index: start + deleteItemsIndex,
                  deleteIndex: deleteItemsIndex,
                  deleteItem: deleteItem,
                },
              },
            )
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
          $eventTarget.dispatchEvent(
            new DynamicEvent(
              'spliceAdd',
              {
                basename,
                path,
                detail: {
                  index: start + addItemsIndex,
                  addIndex: addItemsIndex,
                  addItem: addItem,
                },
              },
            )
          )
          addItemsIndex++
        }
        // Array Splice Event
        $eventTarget.dispatchEvent(
          new DynamicEvent(
            'splice',
            {
              basename: $basename,
              path: $path,
              detail: {
                start,
                deleted: deleteItems,
                added: addItems,
                length: $root.length,
              },
            },
          )
        )
        return deleteItems
      }
    }
  )
}