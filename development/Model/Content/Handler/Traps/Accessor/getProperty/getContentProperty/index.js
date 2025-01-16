import { regularExpressions, recursiveAssign } from '../../../../../../../Coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function getContentProperty() {
  const [$content, $options, $path, $ulteroptions] = [...arguments]
  const { target, path } = $content
  const { proxy } = $content
  // Arguments
  const ulteroptions = recursiveAssign({
    pathkey: $content.options.pathkey,
    subpathError: $content.options.subpathError,
  }, $options, $ulteroptions)
  const { events, pathkey, subpathError } = ulteroptions
  // Path Key: true
  if(pathkey === true) {
    const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape))
    const propertyKey = subpaths.shift()
    let propertyValue = target[propertyKey]
    // Return: Subproperty
    if(subpaths.length) {
      // Subpath Error
      if(subpathError === false && propertyValue === undefined) { return undefined }
      return propertyValue.get(subpaths.join('.'), ulteroptions)
    }
    // Get Property Event
    if(events) {
      if(events['getProperty']) {
        $content.dispatchEvent(
          new ContentEvent('getProperty', {
            path,
            value: propertyValue,
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
    const propertyValue = target[propertyKey]
    return propertyValue
  }
}