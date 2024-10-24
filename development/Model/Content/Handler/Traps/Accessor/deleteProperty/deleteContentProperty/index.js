import { regularExpressions } from '../../../../../../../Coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function deleteContentProperty() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { root, path } = $content
  const { contentEvents } = $content.options
  const { proxy } = $content
  // Arguments
  const $path = arguments[0]
  const ulteroptions = Object.assign({}, $options, arguments[1])
  const { events, pathkey } = ulteroptions
  // Path Key: true
  if(pathkey === true) {
    const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape))
    const propertyKey = subpaths.shift()
    let propertyValue = root[propertyKey]

    if(subpaths.length) {
      return propertyValue.delete(subpaths.join('.'), ulteroptions)
    }
    if(typeof propertyValue === 'object') {
      propertyValue.delete(ulteroptions)
    }
    delete root[propertyKey]
    // Delete Property Event
    if(contentEvents && events.includes('deleteProperty')) {
      $content.dispatchEvent(
        new ContentEvent('deleteProperty', {
          path,
          detail: {
            key: propertyKey,
            val: propertyValue,
          }
        }, $content)
      )
    }
    return undefined
  }
  // Path Key: false
  else if(pathkey === false) {
    const propertyKey = $path
    const propertyValue = root[propertyKey]
    if(propertyValue instanceof Content) {
      propertyValue.delete(ulteroptions)
    }
    delete root[propertyKey]
    // Delete Property Event
    if(contentEvents && events.includes('deleteProperty')) {
      $content.dispatchEvent(
        new ContentEvent('deleteProperty', {
          path,
          detail: {
            key: propertyKey,
            val: propertyValue,
          }
        }, $content)
      )
    }
    return undefined
  }
}