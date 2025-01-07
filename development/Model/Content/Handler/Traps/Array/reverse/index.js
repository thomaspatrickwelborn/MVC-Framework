import { ContentEvent } from '../../../../Events/index.js'
export default function reverse() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { events } = $options
  const { source, path } = $content
  const { proxy } = $content
  Array.prototype.reverse.call(source, ...arguments)
  if(events && events['reverse']) {
    $content.dispatchEvent(
      new ContentEvent(
        'reverse',
        {
          path,
          detail: {
            reference: source
          },
        },
        $content
      )
    )
  }
  return proxy
}