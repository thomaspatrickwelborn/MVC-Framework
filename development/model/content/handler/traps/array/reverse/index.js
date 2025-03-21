import { recursiveAssign } from '../../../../../../coutil/index.js'
import { ContentEvent } from '../../../../events/index.js'
export default function reverse() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const ulteroptions = recursiveAssign({}, $options, $content.options)
  // console.log("reverse", "ulteroptions", ulteroptions)
  const { events } = $options
  const { target, path } = $content
  const { proxy } = $content
  Array.prototype.reverse.call(target, ...arguments)
  if(events && events['reverse']) {
    $content.dispatchEvent(
      new ContentEvent(
        'reverse',
        {
          path,
          detail: {
            reference: target
          },
        },
        $content
      )
    )
  }
  return proxy
}