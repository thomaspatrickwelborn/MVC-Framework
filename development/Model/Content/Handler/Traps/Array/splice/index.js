import Content from '../../../../index.js'
import { ContentEvent } from '../../../../Events/index.js'
export default function splice() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { events } = $options
  const { target, path, schema } = $content
  const { enableValidation, validationEvents } = $content.options
  const $arguments = [...arguments]
  const $start = ($arguments[0] >= 0)
    ? $arguments[0]
    : target.length + $arguments[0]
  const $deleteCount = ($arguments[1] <= 0)
    ? 0
    : (
      $arguments[1] === undefined ||
      $start + $arguments[1] >= target.length
    ) ? target.length - $start
      : $arguments[1]
  const $addItems = $arguments.slice(2)
  const addCount = $addItems.length
  const deleteItems = []
  let deleteItemsIndex = 0
  spliceDelete:
  while(deleteItemsIndex < $deleteCount) {
    const deleteItem = Array.prototype.splice.call(target, $start, 1)[0]
    deleteItems.push(deleteItem)
    // Array Splice Delete Event
    if(events) {
      const contentEventPath = (path)
        ? [path, deleteItemsIndex].join('.')
        : String(deleteItemsIndex)
      if(events['spliceDelete']) {
        $content.dispatchEvent(
          new ContentEvent('spliceDelete', {
            path: contentEventPath,
            value: deleteItem,
            detail: {
              index: $start + deleteItemsIndex,
              deleteIndex: deleteItemsIndex,
              deleteItem: deleteItem,
            },
          }, $content)
        )
      }
      if(events['spliceDelete:$index']) {
        const type = ['spliceDelete', ':', deleteItemsIndex].join('')
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: contentEventPath,
            value: deleteItem,
            detail: {
              index: $start + deleteItemsIndex,
              deleteIndex: deleteItemsIndex,
              deleteItem: deleteItem,
            },
          }, $content)
        )
      }
    }
    deleteItemsIndex++
  }
  let addItemsIndex = 0
  spliceAdd: 
  while(addItemsIndex < addCount) {
    let addItem = $addItems[addItemsIndex]
    // Validation
    if(schema && enableValidation) {
      const validAddItem = schema.validateProperty(elementIndex, element, $content, proxy)
      if(validationEvents) {
        let type, propertyType
        const validatorEventPath = (path)
          ? [path, addItemsIndex].join('.')
          : String(addItemsIndex)
        if(validAddItem.valid) {
          type = 'validProperty'
          propertyType = ['validProperty', ':', addItemsIndex].join('')
        }
        else {
          type = 'nonvalidProperty'
          propertyType = ['nonvalidProperty', ':', addItemsIndex].join('')
        }
        for(const $eventType of [type, propertyType]) {
          $content.dispatchEvent(new ValidatorEvent($eventType, validAddItem, $content))
        }
      }
      if(!validAddItem.valid) { addItemsIndex++; continue spliceAdd }
    }
    const contentPath = (path)
      ? [path, addItemsIndex].join('.')
      : String(addItemsIndex)
    let startIndex = $start + addItemsIndex
    // Add Item: Object Type
    if(typeof addItem === 'object') {
      if(addItem?.classToString === Content.toString()) { addItem = addItem.object }
      const subschema = schema?.context[0] || null
      addItem = new Content(addItem, subschema, {
        path: contentPath,
        parent: proxy,
      })
      Array.prototype.splice.call(
        target, startIndex, 0, addItem
      )
    }
    // Add Item: Primitive Type
    else {
      Array.prototype.splice.call(
        target, startIndex, 0, addItem
      )
    }
    // Array Splice Add Event
    if(events) {
      const contentEventPath = (path)
        ? [path, addItemsIndex].join('.')
        : String(addItemsIndex)
      if(events['spliceAdd']) {
        $content.dispatchEvent(
          new ContentEvent('spliceAdd', {
            path: contentEventPath,
            value: addItem,
            detail: {
              index: $start + addItemsIndex,
              addIndex: addItemsIndex,
              addItem: addItem,
            },
          }, $content)
        )
      }
      if(events['spliceAdd:$index']) {
        const type = ['spliceAdd', ':', addItemsIndex].join('')
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: contentEventPath,
            value: addItem,
            detail: {
              index: $start + addItemsIndex,
              addIndex: addItemsIndex,
              addItem: addItem,
            },
          }, $content)
        )
      }
    }
    addItemsIndex++
  }
  // Array Splice Event
  if(events && events['splice']) {
    $content.dispatchEvent(
      new ContentEvent('splice', {
        path,
        detail: {
          $start,
          deleted: deleteItems,
          added: $addItems,
          length: target.length,
        },
      },
      $content)
    )
  }
  return deleteItems
}