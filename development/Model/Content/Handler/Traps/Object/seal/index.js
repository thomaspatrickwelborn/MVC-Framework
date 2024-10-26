import Content from '../../../../index.js'
import { ContentEvent } from '../../../../Events/index.js'
export default function seal() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { recursive, events } = $options
  const { root, path } = $content
  const { proxy } = $content
  if(recursive === true) {
    iterateProperties: 
    for(const [
      $propertyKey, $propertyValue
    ] of Object.entries(root)) {
      if($propertyValue.classToString === Content.toString()) {
        $propertyValue.seal()
      }
      else { Object.seal($propertyValue) }
      if(contentEvents && events['seal']) {
        $content.dispatchEvent(
          new ContentEvent(
            'seal',
            { path },
            $content
          )
        )
      }
    }
  }
  Object.seal(root)
  return proxy
}