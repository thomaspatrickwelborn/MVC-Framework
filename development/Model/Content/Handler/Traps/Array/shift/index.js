import { ContentEvent } from '../../../../Events/index.js'
export default function shift() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { events } = $options
  const { root, path } = $content
  const shiftElement = Array.prototype.shift.call(root)
  const shiftElementIndex = 0
  // Array Shift Event
  if(contentEvents && events.includes('shift')) {
    $content.dispatchEvent(
      new ContentEvent(
        'shift',
        {
          path,
          detail: {
            element: shiftElement,
            elementIndex: shiftElementIndex,
          },
        },
        $content
      )
    )
  }
  return shiftElement
}