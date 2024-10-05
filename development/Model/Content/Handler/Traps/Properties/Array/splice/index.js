import { isDirectInstanceOf } from '../../Coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function Splice(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
    schema,
  } = $aliases
  const { enableValidation, validationType } = schema.options
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
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
          if(events.includes('spliceDelete')) {
            eventTarget.dispatchEvent(
              new ContentEvent('spliceDelete', {
                _basename,
                _path,
                detail: {
                  index: start + deleteItemsIndex,
                  deleteIndex: deleteItemsIndex,
                  deleteItem: deleteItem,
                },
              }, eventTarget)
            )
          }
          deleteItemsIndex++
        }
        let addItemsIndex = 0
        spliceAdd: 
        while(addItemsIndex < addCount) {
          let _basename, _path
          let addItem = addItems[addItemsIndex]
          let validAddItem
          _basename = addItemsIndex
          _path = (path !== null)
            ? path.concat('.', addItemsIndex)
            : addItemsIndex
          let startIndex = start + addItemsIndex
          if(isDirectInstanceOf(addItem, [Object, Array/*, Map*/])) {
            const subschema = schema.context[0]
            validAddItem = (enableValidation && validationType === 'object')
              ? subschema.validate(addItem).valid
              : null
            if(validAddItem === true || validAddItem === null) {
              addItem = new Content(addItem, {
                basename: _basename,
                path: _path,
                rootAlias: rootAlias,
              }, subschema)
              Array.prototype.splice.call(
                root, startIndex, 0, addItem
              )
            }
          } else {
            validAddItem = (enableValidation && validationType === 'primitive')
              ? schema.validateProperty(startIndex, addItem)
              : null
            if(validAddItem === true || validAddItem === null) {
              Array.prototype.splice.call(
                root, startIndex, 0, addItem
              )
            }
          }
          _basename = addItemsIndex
          _path = (path !== null)
            ? path.concat('.', addItemsIndex)
            : addItemsIndex
          // Array Splice Add Event
          if(events.includes('spliceAdd')) {
            if(validAddItem === true || validAddItem === null) {
              eventTarget.dispatchEvent(
                new ContentEvent('spliceAdd', {
                  basename: _basename,
                  path: _path,
                  detail: {
                    index: start + addItemsIndex,
                    addIndex: addItemsIndex,
                    addItem: addItem,
                  },
                }, eventTarget)
              )
            }
          }
          addItemsIndex++
        }
        // Array Splice Event
        if(events.includes('splice')) {
          eventTarget.dispatchEvent(
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
            eventTarget)
          )
        }
        return deleteItems
      }
    }
  )
}