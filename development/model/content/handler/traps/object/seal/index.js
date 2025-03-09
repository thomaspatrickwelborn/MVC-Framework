import { recursiveAssign } from '../../../../../../coutil/index.js'
import Content from '../../../../index.js'
import { ContentEvent } from '../../../../events/index.js'
export default function seal() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const ulteroptions = recursiveAssign({}, $options, $content.options)
  // console.log("seal", "ulteroptions", ulteroptions)
  const { recursive, events } = $options
  const { target, path } = $content
  const { proxy } = $content
  if(recursive === true) {
    iterateProperties: 
    for(const [
      $propertyKey, $propertyValue
    ] of Object.entries(target)) {
      if($propertyValue.classToString === Content.toString()) {
        $propertyValue.seal()
      }
      else { Object.seal($propertyValue) }
      if(events && events['seal']) {
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
  Object.seal(target)
  return proxy
}