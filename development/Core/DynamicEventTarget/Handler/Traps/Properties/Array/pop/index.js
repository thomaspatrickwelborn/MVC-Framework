import {
  DynamicEvent,
  DynamicEventBubble,
} from '../../../Events/index.js'
export default function Pop(
  $trap, $trapPropertyName, $aliases
) {
  const {
    $eventTarget, 
    $root, 
    $rootAlias, 
    $basename,
    $path, 
  } = $aliases
  $eventTarget.addEventListener(
    'lengthSet', DynamicEventBubble
  )
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const popElement = Array.prototype.pop.call($root)
        const popElementIndex = $root.length - 1
        const basename = popElementIndex
        const path = (
          $path !== null
        ) ? $path.concat('.', popElementIndex)
          : popElementIndex
        // Array Pop Event
        $eventTarget.dispatchEvent(
          new DynamicEvent(
            'lengthSet',
            {
              basename,
              path,
              detail: {
                element: popElement,
                elementIndex: popElementIndex,
              },
            }
          )
        )
        return popElement
      }
    }
  )
}