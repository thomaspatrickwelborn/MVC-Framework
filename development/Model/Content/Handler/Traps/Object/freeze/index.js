import Content from '../../../../index.js'
import { ContentEvent } from '../../../../Events/index.js'
export default function freeze() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { recursive, events } = $options
  const { source, path } = $content
  const { proxy } = $content
  if(recursive === true) {
    iterateProperties: 
    for(const [
      $propertyKey, $propertyValue
    ] of Object.entries(source)) {
      if($propertyValue.classToString === Content.toString()) {
        $propertyValue.freeze()
      }
      else { Object.freeze($propertyValue) }
      if(contentEvents && events['freeze']) {
        $content.dispatchEvent(
          new ContentEvent(
            'freeze',
            { path },
            $content
          )
        )
      }
    }
  }
  Object.freeze(source)
  return proxy
}