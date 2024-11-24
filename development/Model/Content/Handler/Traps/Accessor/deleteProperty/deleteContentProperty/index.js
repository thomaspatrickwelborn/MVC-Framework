import { regularExpressions, recursiveAssign } from '../../../../../../../Coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function deleteContentProperty() {
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
      return propertyValue.delete(subpaths.join('.'), ulteroptions)
    }
    if(typeof propertyValue === 'object') {
      propertyValue.delete(ulteroptions)
    }
    delete source[propertyKey]
    // Delete Property Event
    if(contentEvents) {
      if(events['deleteProperty']) {
        $content.dispatchEvent(
          new ContentEvent('deleteProperty', {
            path,
            detail: {
              key: propertyKey,
              value: propertyValue,
            }
          }, $content)
        )
      }
      if(events['deleteProperty:$key']) {
        const type = ['deleteProperty', ':', propertyKey].join('')
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
    return undefined
  }
  // Path Key: false
  else if(pathkey === false) {
    const propertyKey = $path
    const propertyValue = source[propertyKey]
    if(propertyValue instanceof Content) {
      propertyValue.delete(ulteroptions)
    }
    delete source[propertyKey]
    // Delete Property Event
    if(contentEvents) {
      if(events['deleteProperty']) {
        $content.dispatchEvent(
          new ContentEvent('deleteProperty', {
            path,
            detail: {
              key: propertyKey,
              value: propertyValue,
            }
          }, $content)
        )
      }
      if(events['deleteProperty:$key']) {
        const type = ['deleteProperty', ':', propertyKey].join('')
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
    return undefined
  }
}