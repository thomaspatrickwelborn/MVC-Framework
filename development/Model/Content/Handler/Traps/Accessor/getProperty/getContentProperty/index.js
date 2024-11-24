import { regularExpressions, recursiveAssign } from '../../../../../../../Coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function getContentProperty() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { source, path } = $content
  const { contentEvents } = $content.options
  const { proxy } = $content
  // Arguments
  const $path = arguments[0]
  const ulteroptions = recursiveAssign({
    pathkey: $content.options.pathkey,
    subpathError: $content.options.subpathError,
  }, $options, arguments[1])
  const { events, pathkey, subpathError } = ulteroptions
  // Path Key: true
  if(pathkey === true) {
    const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape))
    const propertyKey = subpaths.shift()
    let propertyValue = source[propertyKey]
    // Return: Subproperty
    if(subpaths.length) {
      // Subpath Error
      if(subpathError === false && propertyValue === undefined) { return undefined }
      return propertyValue.get(subpaths.join('.'), ulteroptions)
    }
    // Get Property Event
    if(contentEvents) {
      if(events['getProperty']) {
        $content.dispatchEvent(
          new ContentEvent('getProperty', {
            path,
            detail: {
              key: propertyKey,
              value: propertyValue,
            }
          }, $content)
        )
      }
      if(events['getProperty:$key']) {
        const type = ['getProperty', ':', propertyKey].join('')
        const _path = [path, '.', propertyKey].join('')
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: _path,
            detail: {
              value: propertyValue,
            }
          }, $content)
        )
      }
    }
    return propertyValue
  }
  // Path Key: false
  else if(pathkey === false) {
    const propertyValue = source[propertyKey]
    return propertyValue
  }
}