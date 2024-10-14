import { ContentEvent } from '../../../../../Events/index.js'
export default function Pop($content, $options) {
  const { events } = $options
  const { root, basename, path } = $content
  return function pop() {
    const popElement = Array.prototype.pop.call(root)
    const popElementIndex = root.length - 1
    const basename = popElementIndex
    const path = (
      path !== null
    ) ? path.concat('.', popElementIndex)
      : popElementIndex
    // Array Pop Event
    if(events.includes('pop')) {
      $content.dispatchEvent(
        new ContentEvent(
          'pop',
          {
            basename,
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
}