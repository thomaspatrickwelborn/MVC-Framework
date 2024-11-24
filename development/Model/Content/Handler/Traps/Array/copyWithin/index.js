import { ContentEvent } from '../../../../Events/index.js'
export default function copyWithin() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { events } = $options
  const { source, path } = $content
  const { enableValidation, validationEvents, contentEvents } = $content.options
  const $arguments = [...arguments]
  const target = (
    arguments[0] >= 0
  ) ? arguments[0]
    : source.length = arguments[0]
  const start = (
    arguments[1] >= 0
  ) ? arguments[1]
    : source.length + arguments[1]
  const end = (
    arguments[2] === undefined
  ) ? source.length
    : (
    arguments[2] >= 0
  ) ? arguments[2]
    : source.length + arguments[2]
  const copiedItems = []
  let copyIndex = start
  let targetIndex = target
  iterateCopyIndex: 
  while(copyIndex < end) {
    const copyItem = source[copyIndex]
    copiedItems.push(copyItem)
    Array.prototype.copyWithin.call(
      source,
      targetIndex,
      copyIndex,
      copyIndex + 1
    )
    // Array Copy Within Index Event Data
    if(contentEvents) {
      if(events['copyWithinIndex']) {
        $content.dispatchEvent(
          new ContentEvent(
            'copyWithinIndex',
            {
              path,
              value: copyItem,
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
      if(events['copyWithinIndex:$index']) {
        const type  = ['copyWithinIndex', ':', copyIndex].join('')
        const _path = [path, '.', copyIndex].join('')
        $content.dispatchEvent(
          new ContentEvent(
            type,
            {
              path: _path,
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
    }
    copyIndex++
    targetIndex++
  }
  // Array Copy Within Event
  if(contentEvents && events['copyWithin']) {
    $content.dispatchEvent(
      new ContentEvent(
        'copyWithin',
        {
          path,
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
  return proxy
}