export default function Push(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const elements = []
        let elementIndex = 0
        iterateElements:
        for(let $element of arguments) {
          if(typeof $element === 'object') {
            $element = new DynamicEventTarget($element, {
              rootAlias: $rootAlias,
            })
          }
          elements.push($element)
          Array.prototype.push.call($root, $element)
          // Push Prop Event
          $trap.createEvent(
            $eventTarget,
            'pushProp',
            {
              elementIndex, 
              element: $element,
            },
            $root,
          )
          elementIndex++
        }
        // Push Event
        $trap.createEvent(
          $eventTarget,
          'push',
          { elements },
          $root,
        )
        return $root.length
      }
    }  
  )
}