import Content from '../../../../index.js'
import { ContentEvent } from '../../../../Events/index.js'
export default function splice() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { events } = $options
  const { root, path, schema } = $content
  const { enableValidation, validationEvents, contentEvents } = $content.options
  const $arguments = [...arguments]
  const $start = ($arguments[0] >= 0)
    ? $arguments[0]
    : root.length + $arguments[0]
  const $deleteCount = ($arguments[1] <= 0)
    ? 0
    : (
      $arguments[1] === undefined ||
      $start + $arguments[1] >= root.length
    ) ? root.length - $start
      : $arguments[1]
  const $addItems = $arguments.slice(2)
  const addCount = $addItems.length
  const deleteItems = []
  let deleteItemsIndex = 0
  spliceDelete:
  while(deleteItemsIndex < $deleteCount) {
    const deleteItem = Array.prototype.splice.call(root, $start, 1)[0]
    deleteItems.push(deleteItem)
    // Array Splice Delete Event
    if(contentEvents && events['spliceDelete']) {
      $content.dispatchEvent(
        new ContentEvent('spliceDelete', {
          path,
          detail: {
            index: $start + deleteItemsIndex,
            deleteIndex: deleteItemsIndex,
            deleteItem: deleteItem,
          },
        }, $content)
      )
    }
    deleteItemsIndex++
  }
  let addItemsIndex = 0
  spliceAdd: 
  while(addItemsIndex < addCount) {
    let addItem = $addItems[addItemsIndex]
    // Validation
    if(schema && enableValidation) {
      const validAddItem = schema.validateProperty(elementIndex, element)
      if(validationEvents) {
        $content.dispatchEvent(
          new ValidatorEvent('validateProperty', {
            path,
            detail: validAddItem,
          }, $content)
        )
      }
      if(!validAddItem.valid) { addItemsIndex++; continue spliceAdd }
    }
    const _path = (path !== null)
      ? path.concat('.', addItemsIndex)
      : addItemsIndex
    let startIndex = $start + addItemsIndex
    // Add Item: Object Type
    if(typeof addItem === 'object') {
      if(addItem?.classToString === Content.toString()) { addItem = addItem.object }
      const subschema = schema?.context[0] || null
      addItem = new Content(addItem, subschema, {
        path: _path,
        parent: proxy,
      })
      Array.prototype.splice.call(
        root, startIndex, 0, addItem
      )
    }
    // Add Item: Primitive Type
    else {
      Array.prototype.splice.call(
        root, startIndex, 0, addItem
      )
    }
    // Array Splice Add Event
    if(contentEvents && events['spliceAdd']) {
      $content.dispatchEvent(
        new ContentEvent('spliceAdd', {
          path,
          detail: {
            index: $start + addItemsIndex,
            addIndex: addItemsIndex,
            addItem: addItem,
          },
        }, $content)
      )
    }
    addItemsIndex++
  }
  // Array Splice Event
  if(contentEvents && events['splice']) {
    $content.dispatchEvent(
      new ContentEvent('splice', {
        path,
        detail: {
          $start,
          deleted: deleteItems,
          added: $addItems,
          length: root.length,
        },
      },
      $content)
    )
  }
  return deleteItems
}