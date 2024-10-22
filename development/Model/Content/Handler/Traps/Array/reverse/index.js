import { ContentEvent } from '../../../../Events/index.js'
export default function reverse() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { events } = $options
  const { root, basename, path } = $content
  const { proxy } = $content
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
  return proxy
}