import Content from '../../../../../../index.js'
import { ContentEvent } from '../../../../../../Events/index.js'
export default function DeleteContentProperty($content, $options) {
  const { root, basename, path } = $content
  const { contentEvents } = $content.options
  return function deleteContentProperty() {
    const { proxy } = $content
    // Arguments
    const $path = arguments[0]
    const ulteroptions = Object.assign({}, $options, arguments[1])
    const { events, pathkey } = ulteroptions
    // Path Key: true
    if(pathkey === true) {
      const subpaths = $path.split(new RegExp(/\.(?=(?:[^"]*"[^"]*")*[^"]*$)/))
      const propertyKey = subpaths.shift()
      let propertyValue = root[propertyKey]

      if(subpaths.length) {
        return propertyValue.delete(subpaths.join('.'), ulteroptions)
      }
      const _basename = propertyKey
      const _path = (path !== null)
        ? path.concat('.', _basename)
        : _basename
      if(typeof propertyValue === 'object') {
        propertyValue.delete(ulteroptions)
      }
      delete root[propertyKey]
      // Delete Property Event
      if(contentEvents && events.includes('deleteProperty')) {
        $content.dispatchEvent(
          new ContentEvent('deleteProperty', {
            basename: _basename,
            path: _path,
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
      const _basename = propertyKey
      const _path = (path !== null)
        ? path.concat('.', _basename)
        : _basename
      if(propertyValue instanceof Content) {
        propertyValue.delete(ulteroptions)
      }
      delete root[propertyKey]
      // Delete Property Event
      if(contentEvents && events.includes('deleteProperty')) {
        $content.dispatchEvent(
          new ContentEvent('deleteProperty', {
            basename: _basename,
            path: _path,
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
}