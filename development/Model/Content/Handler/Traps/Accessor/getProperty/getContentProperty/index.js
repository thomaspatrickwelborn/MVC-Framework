import { regularExpressions } from '../../../../../../../Coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function getContentProperty() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { root, basename, path } = $content
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
      return propertyValue.get(subpaths.join('.'), ulteroptions)
    }
    const _path = (path !== null)
      ? path.concat('.', propertyKey)
      : propertyKey
    // Delete Property Event
    if(contentEvents && events.includes('deleteProperty')) {
      $content.dispatchEvent(
        new ContentEvent('deleteProperty', {
          path: _path,
          detail: {
            key: propertyKey,
            val: propertyValue,
          }
        }, $content)
      )
    }
    return propertyValue
  }
}