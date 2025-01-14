import { ContentEvent } from '../../../../Events/index.js'
export default function pop() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { events } = $options
  const { target, path } = $content
  const popElement = Array.prototype.pop.call(target)
  const popElementIndex = target.length - 1
  // Array Pop Event
  if(events && events['pop']) {
    const contentEventPath = (path)
      ? [path, popElementIndex].join('.')
      : String(popElementIndex)
    $content.dispatchEvent(
      new ContentEvent(
        'pop',
        {
          path: contentEventPath,
          value: popElement,
          detail: {
            elementIndex: popElementIndex,
            element: popElement,
          },
        },
        $content
      )
    )
  }
  return popElement
}