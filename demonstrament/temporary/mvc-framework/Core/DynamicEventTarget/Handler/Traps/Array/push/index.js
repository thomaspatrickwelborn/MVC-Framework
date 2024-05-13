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
          $root.push($element)
          // Push Prop Event
          $this.createEvent(
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
        $this.createEvent(
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