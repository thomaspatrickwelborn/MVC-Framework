import { ContentEvent } from '../../../../../Events/index.js'
export default function Pop(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
  } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const popElement = Array.prototype.pop.call(root)
        const popElementIndex = root.length - 1
        const basename = popElementIndex
        const path = (
          path !== null
        ) ? path.concat('.', popElementIndex)
          : popElementIndex
        // Array Pop Event
        if(events.includes('pop')) {
          eventTarget.dispatchEvent(
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
              eventTarget
            )
          )
        }
        return popElement
      }
    }
  )
}