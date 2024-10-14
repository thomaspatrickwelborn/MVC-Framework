import { ContentEvent } from '../../../../../Events/index.js'
export default function CopyWithin($content, $options) {
  const { events } = $options
  const { root, basename, path } = $content
  return function copyWithin() {
    const $arguments = [...arguments]
    const target = (
      arguments[0] >= 0
    ) ? arguments[0]
      : root.length = arguments[0]
    const start = (
      arguments[1] >= 0
    ) ? arguments[1]
      : root.length + arguments[1]
    const end = (
      arguments[2] === undefined
    ) ? root.length
      : (
      arguments[2] >= 0
    ) ? arguments[2]
      : root.length + arguments[2]
    const copiedItems = []
    let copyIndex = start
    let targetIndex = target
    iterateCopyIndex: 
    while(copyIndex < end) {
      const copyItem = root[copyIndex]
      copiedItems.push(copyItem)
      Array.prototype.copyWithin.call(
        root,
        targetIndex,
        copyIndex,
        copyIndex + 1
      )
      // Array Copy Within Index Event Data
      if(events.includes('copyWithinIndex')) {
        $content.dispatchEvent(
          new ContentEvent(
            'copyWithinIndex',
            {
              basename: $content.basename,
              path: $content.path,
              detail: {
                target: targetIndex,
                start: copyIndex,
                end: copyIndex + 1,
                item: copyItem,
              },
            },
            $content
          )
        )
      }
      copyIndex++
      targetIndex++
    }
    // Array Copy Within Event
    if(events.includes('copyWithin')) {
      $content.dispatchEvent(
        new ContentEvent(
          'copyWithin',
          {
            basename: $content.basename,
            path: $content.path,
            detail: {
              target: target,
              start: start,
              end: end,
              items: copiedItems,
            },
          },
          $content
        )
      )
    }
  }
}