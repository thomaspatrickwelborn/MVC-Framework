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
    'pop', 
    ($event) => {
      if($eventTarget.parent !== null) {
        const popEventData = {
          path: $event.path,
          basename: $event.basename,
          element: $event.detail.element,
          elementIndex: $event.detail.elementIndex,
        }
        $trap.createEvent(
          $eventTarget.parent,
          'pop',
          popEventData,
        )
      }
    }
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
        $trap.createEvent(
          $eventTarget,
          'pop',
          {
            basename,
            path,
            element: popElement,
            elementIndex: popElementIndex,
          }
        )
        return popElement
      }
    }
  )
}