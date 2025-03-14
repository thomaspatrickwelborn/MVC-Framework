import { recursiveAssign } from '../../../../../../coutil/index.js'
import { ContentEvent } from '../../../../events/index.js'
export default function shift() {
  const [$content, $options] = [...arguments]
  const ulteroptions = recursiveAssign({}, $options, $content.options)
  // console.log("shift", "ulteroptions", ulteroptions)
  const { events } = $options
  const { target, path } = $content
  const shiftElement = Array.prototype.shift.call(target)
  const shiftElementIndex = 0
  // Array Shift Event
  if(events && events['shift']) {
    const contentEventPath = (path)
      ? [path, shiftElementIndex].join('.')
      : String(shiftElementIndex)
    $content.dispatchEvent(
      new ContentEvent(
        'shift',
        {
          path: contentEventPath,
          value: shiftElement,
          detail: {
            elementIndex: shiftElementIndex,
            element: shiftElement,
          },
        },
        $content
      )
    )
  }
  return shiftElement
}