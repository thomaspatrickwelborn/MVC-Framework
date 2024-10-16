import { isDirectInstanceOf } from '../../Coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function Splice($content, $options) {
  const { events } = $options
  const { root, basename,path, schema } = $content
  const { enableValidation, validationEvents, contentEvents } = $content.options
  return function splice() {
    const $arguments = [...arguments]
    const start = ($arguments[0] >= 0)
      ? $arguments[0]
      : root.length + $arguments[0]
    const deleteCount = ($arguments[1] <= 0)
      ? 0
      : (
        $arguments[1] === undefined ||
        start + $arguments[1] >= root.length
      ) ? root.length - start
        : $arguments[1]
    const addItems = $arguments.slice(2)
    const addCount = addItems.length
    const deleteItems = []
    let deleteItemsIndex = 0
    spliceDelete:
    while(deleteItemsIndex < deleteCount) {
      const deleteItem = Array.prototype.splice.call(root, start, 1)[0]
      deleteItems.push(deleteItem)
      // Array Splice Delete Event
      const _basename = deleteItemsIndex
      const _path = (path !== null)
        ? path.concat('.', deleteItemsIndex)
        : deleteItemsIndex
      if(contentEvents && events.includes('spliceDelete')) {
        $content.dispatchEvent(
          new ContentEvent('spliceDelete', {
            _basename,
            _path,
            detail: {
              index: start + deleteItemsIndex,
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
      let _basename, _path
      let addItem = addItems[addItemsIndex]

      // Validation
      if(schema && enableValidation) {
        const validAddItem = schema.validateProperty(elementIndex, element)
        if(validationEvents) {
          $content.dispatchEvent(
            new ValidatorEvent('validateProperty', {
              basename: _basename,
              path: _path,
              detail: validAddItem,
            }, $content)
          )
        }
        if(!validAddItem.valid) { addItemsIndex++; continue spliceAdd }
      }
      _basename = addItemsIndex
      _path = (path !== null)
        ? path.concat('.', addItemsIndex)
        : addItemsIndex
      let startIndex = start + addItemsIndex
      if(isDirectInstanceOf(addItem, [Object, Array/*, Map*/])) {
        const subschema = schema?.context[0] || null
        addItem = new Content(addItem, subschema, {
          basename: _basename,
          path: _path,
          parent: proxy,
        })
        Array.prototype.splice.call(
          root, startIndex, 0, addItem
        )
      } else {
        Array.prototype.splice.call(
          root, startIndex, 0, addItem
        )
      }
      _basename = addItemsIndex
      _path = (path !== null)
        ? path.concat('.', addItemsIndex)
        : addItemsIndex
      // Array Splice Add Event
      if(contentEvents && events.includes('spliceAdd')) {
        $content.dispatchEvent(
          new ContentEvent('spliceAdd', {
            basename: _basename,
            path: _path,
            detail: {
              index: start + addItemsIndex,
              addIndex: addItemsIndex,
              addItem: addItem,
            },
          }, $content)
        )
      }
      addItemsIndex++
    }
    // Array Splice Event
    if(contentEvents && events.includes('splice')) {
      $content.dispatchEvent(
        new ContentEvent('splice', {
          basename,
          path: path,
          detail: {
            start,
            deleted: deleteItems,
            added: addItems,
            length: root.length,
          },
        },
        $content)
      )
    }
    return deleteItems
  }
}