import { recursiveAssign } from '../../../../../../coutil/index.js'
import Content from '../../../../index.js'
import { ContentEvent } from '../../../../events/index.js'
export default function freeze() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const ulteroptions = recursiveAssign({}, $options, $content.options)
  // console.log("seal", "ulteroptions", ulteroptions)
  const { recursive, events } = $options
  const { target, path } = $content
  if(recursive === true) {
    iterateProperties: 
    for(const [
      $propertyKey, $propertyValue
    ] of Object.entries(target)) {
      if($propertyValue.classToString === Content.toString()) {
        $propertyValue.freeze()
      }
      else { Object.freeze($propertyValue) }
      if(events && events['freeze']) {
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
  Object.freeze(target)
  return $content
}