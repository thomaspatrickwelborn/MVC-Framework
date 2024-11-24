import { ContentEvent } from '../../../../Events/index.js'
export default function shift() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { events } = $options
  const { source, path } = $content
  const shiftElement = Array.prototype.shift.call(source)
  const shiftElementIndex = 0
  // Array Shift Event
  if(contentEvents && events['shift']) {
    $content.dispatchEvent(
      new ContentEvent(
        'shift',
        {
          path,
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