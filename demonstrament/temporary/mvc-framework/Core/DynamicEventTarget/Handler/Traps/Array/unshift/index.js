export default function Unshift(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $this, $arrayPrototypePropertyName, {
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
          elements.unshift($element)
          $root.unshift($element)
          // Array Unshift Prop Event
          $this.createEvent(
            $eventTarget,
            'unshiftProp',
            {
              elementIndex, 
              element: $element,
            },
            $root,
          )
          elementIndex++
        }
        // Array Unshift Event
        $this.createEvent(
          $eventTarget,
          'unshift',
          { elements },
          $root,
        )
        return $root.length
      }
    }  
  )
}