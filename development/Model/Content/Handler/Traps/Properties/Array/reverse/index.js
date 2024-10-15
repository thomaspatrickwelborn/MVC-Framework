import { ContentEvent } from '../../../../../Events/index.js'
export default function Reverse($content, $options) {
  const { events } = $options
  const { root, basename, path } = $content
  return function reverse() {
    Array.prototype.reverse.call(root, ...arguments)
    if(contentEvents && events.includes('reverse')) {
      $content.dispatchEvent(
        new ContentEvent(
          'reverse',
          {
            basename,
            path,
            detail: {
              reference: root
            },
          },
          $content
        )
      )
    }
    return root
  }
}