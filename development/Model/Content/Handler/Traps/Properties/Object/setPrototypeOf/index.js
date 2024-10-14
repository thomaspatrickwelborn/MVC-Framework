import { typeOf, isDirectInstanceOf } from '../../Coutil/index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function SetPrototypeOf($content, $options) {
  const { root, basename, path } = $content
  return function setPrototypeOf() {
    const prototype = arguments[0]
    Object.setPrototypeOf(root, prototype)
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
    return root
  }
}