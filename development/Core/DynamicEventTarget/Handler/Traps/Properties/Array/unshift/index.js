import { isDirectInstanceOf } from '../../Coutil/index.js'
import DETEvent from '../../../../../DynamicEvent/index.js'
export default function Unshift(
  $trap, $trapPropertyName, $aliases
) {
  const {
    $eventTarget, 
    $root, 
    $rootAlias, 
    $basename,
    $path, 
  } = $aliases
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
            element, [Object, Array/*, Map*/]
          )) {
            element = new DynamicEventTarget(element, {
              rootAlias: $rootAlias,
            })
          }
          elements.unshift(element)
          Array.prototype.unshift.call($root, element)
          const basename = elementIndex
          const path = (
            $path !== null
          ) ? $path.concat('.', elementIndex)
            : elementIndex
          // Array Unshift Prop Event
            
          $eventTarget.dispatchEvent(
            new DETEvent(
              'unshiftProp',
              {
                basename,
                path,
                detail: {
                  elementIndex, 
                  element: element,
                },
              },
              $eventTarget
            )
          )
          elementIndex--
        }
        // Array Unshift Event
        const basename = elementIndex
        const path = (
          $path !== null
        ) ? $path.concat('.', elementIndex)
          : elementIndex
        $eventTarget.dispatchEvent(
          new DETEvent(
            'unshift',
            {
              basename: $basename,
              path: $path,
              detail: {
                elements,
              },
            },
            $eventTarget
          )
        )
        return $root.length
      }
    }  
  )
}