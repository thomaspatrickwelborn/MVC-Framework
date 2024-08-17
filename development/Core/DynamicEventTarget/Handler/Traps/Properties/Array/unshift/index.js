import { isDirectInstanceOf } from '../../Coutil/index.js'
import DynamicEventTarget from '../../../../../index.js'
export default function Unshift(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $arguments = [...arguments]
        const elements = []
        const elementsLength = $arguments.length
        let elementIndex = elementsLength - 1
        iterateElements:
        while(elementIndex > -1) {
        const elementsLength = $arguments.length
          const element = $arguments[elementIndex]
          if(isDirectInstanceOf(
            element, [Array, Object, Map]
          )) {
            element = new DynamicEventTarget(element, {
              rootAlias: $rootAlias,
            })
          }
          elements.unshift(element)
          Array.prototype.unshift.call($root, element)
          // Array Unshift Prop Event
          $trap.createEvent(
            $eventTarget,
            'unshiftProp',
            {
              elementIndex, 
              element: element,
              path: $path,
              basename: $basename,
            },
            $root,
          )
          elementIndex--
        }
        // Array Unshift Event
        $trap.createEvent(
          $eventTarget,
          'unshift',
          {
            elements, 
            path: $path,
            basename: $basename,
          },
          $root,
        )
        return $root.length
      }
    }  
  )
}