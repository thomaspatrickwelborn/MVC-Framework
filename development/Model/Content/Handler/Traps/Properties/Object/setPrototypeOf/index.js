import { typeOf, isDirectInstanceOf } from '../../Coutil/index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function SetPrototypeOf($content, $options) {
  const { events } = $options
  const { root, basename, path } = $content
  const { contentEvents } = $content.options
  return function setPrototypeOf() {
    const { proxy } = $content
    const prototype = arguments[0]
    Object.setPrototypeOf(root, prototype)
    if(contentEvents && events.includes('setPrototypeOf'))
    $content.dispatchEvent(
      new ContentEvent(
        'setPrototypeOf',
        {
          basename,
          path,
          detail: {
            prototype
          },
        },
        $content
      )
    )
    return proxy
  }
}