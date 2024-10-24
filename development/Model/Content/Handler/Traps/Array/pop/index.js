import { ContentEvent } from '../../../../Events/index.js'
export default function pop() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { events } = $options
  const { root, path } = $content
  const popElement = Array.prototype.pop.call(root)
  const popElementIndex = root.length - 1
  // Array Pop Event
  if(contentEvents && events.includes('pop')) {
    $content.dispatchEvent(
      new ContentEvent(
        'pop',
        {
          path, 
          detail: {
            element: popElement,
            elementIndex: popElementIndex,
          },
        },
        $content
      )
    )
  }
  return popElement
}