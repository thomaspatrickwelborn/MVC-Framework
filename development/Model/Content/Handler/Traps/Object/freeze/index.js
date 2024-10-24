import { typeOf, isDirectInstanceOf } from '../../../../../../Coutil/index.js'
import Content from '../../../../index.js'
import { ContentEvent } from '../../../../Events/index.js'
export default function freeze() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { recursive, events } = $options
  const { root, path } = $content
  const { proxy } = $content
  if(recursive === true) {
    iterateProperties: 
    for(const [
      $propertyKey, $propertyValue
    ] of Object.entries(this)) {
      if($propertyValue.classToString === Content.toString()) {
        $propertyValue.freeze()
      } else { Object.freeze($propertyValue) }
      const _path = (
        path !== null
      ) ? path.concat('.', $propertyKey)
        : $propertyKey
      if(contentEvents && events.includes('freeze')) {
        $content.dispatchEvent(
          new ContentEvent(
            'freeze',
            { path: _path },
            $content
          )
        )
      }
    }
  }
  Object.freeze(this)
  return proxy
}