import { typeOf, isDirectInstanceOf } from '../../Coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function Freeze($content, $options) {
  const { recurse, events } = $options
  const { root, basename, path } = $content
  return function freeze() {
    if(recurse === true) {
      iterateProperties: 
      for(const [
        $propertyKey, $propertyValue
      ] of Object.entries(this)) {
        if(
          $propertyValue.constructor.name === 'bound Content'
        ) {
          $propertyValue.freeze()
        } else {
          Object.freeze($propertyValue)
        }
        const _basename = $propertyKey
        const _path = (
          path !== null
        ) ? path.concat('.', $propertyKey)
          : $propertyKey
        if(contentEvents && events.includes('freeze')) {
          $content.dispatchEvent(
            new ContentEvent(
              'freeze',
              {
                path: _path,
                basename: _basename,
              },
              $content
            )
          )
        }
      }
    }
    Object.freeze(this)
    return root
  }
}