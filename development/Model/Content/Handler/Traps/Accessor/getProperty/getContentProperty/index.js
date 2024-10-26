import { regularExpressions } from '../../../../../../../Coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function getContentProperty() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { root, path } = $content
  const { contentEvents } = $content.options
  const { proxy } = $content
  // Arguments
  const $path = arguments[0]
  const ulteroptions = Object.assign({}, $options, arguments[1])
  const { events, pathkey, keychaining } = ulteroptions
  // Path Key: true
  if(pathkey === true) {
    const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape))
    const propertyKey = subpaths.shift()
    let propertyValue = root[propertyKey]
    if(subpaths.length) {
      return propertyValue.get(subpaths.join('.'), ulteroptions)
    }
    // Delete Property Event
    if(contentEvents && events.includes('getProperty')) {
      $content.dispatchEvent(
        new ContentEvent('getProperty', {
          path,
          detail: {
            key: propertyKey,
            val: propertyValue,
          }
        }, $content)
      )
    }
    return propertyValue
  }
  // Path Key: false
  else if(pathkey === false) {
    const propertyValue = root[propertyKey]
    return propertyValue
  }
}