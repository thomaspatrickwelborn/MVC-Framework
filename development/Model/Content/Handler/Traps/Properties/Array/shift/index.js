import { ContentEvent } from '../../../../../Events/index.js'
export default function Shift($content, $options) {
  const { events } = $options
  const { root, basename, path } = $content
  return function shift() {
    const shiftElement = Array.prototype.shift.call(root)
    const shiftElementIndex = 0
    const basename = shiftElementIndex
    const path = (
      path !== null
    ) ? path.concat('.', shiftElementIndex)
      : shiftElementIndex
    // Array Shift Event
    if(contentEvents && events.includes('shift')) {
      $content.dispatchEvent(
        new ContentEvent(
          'shift',
          {
            basename,
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
}