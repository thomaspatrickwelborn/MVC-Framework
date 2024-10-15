import { typeOf, isDirectInstanceOf } from '../../Coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function Seal($content, $options) {
  const { recurse, events } = $options
  const { root,  basename, path } = $content
  return function seal() {
    const { proxy } = $content
    if(recurse === true) {
      iterateProperties: 
      for(const [
        $propertyKey, $propertyValue
      ] of Object.entries(this)) {
        if(
          $propertyValue.constructor.name === 'bound Content'
        ) {
          $propertyValue.seal()
        } else {
          Object.seal($propertyValue)
        }
        const basename = $propertyKey
        const path = (
          path !== null
        ) ? path.concat('.', $propertyKey)
          : $propertyKey
        if(contentEvents && events.includes('seal')) {
          $content.dispatchEvent(
            new ContentEvent(
              'seal',
              {
                path,
                basename,
              },
              $content
            )
          )
        }
      }
    }
    Object.seal(this)
    return proxy
  }
}