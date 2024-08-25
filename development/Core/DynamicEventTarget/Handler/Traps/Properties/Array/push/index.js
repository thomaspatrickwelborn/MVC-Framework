import { isDirectInstanceOf } from '../../Coutil/index.js'
import DynamicEventTarget from '../../../../../index.js'
import DETEvent from '../../../../../DynamicEvent/index.js'
export default function Push(
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
        const elements = []
        let elementIndex = 0
        iterateElements:
        for(let $element of arguments) {
          if(isDirectInstanceOf(
            $element, [Object, Array/*, Map*/]
          )) {
            $element = new DynamicEventTarget($element, {
              rootAlias: $rootAlias,
            })
          }
          elements.push($element)
          Array.prototype.push.call($root, $element)
          const basename = elementIndex
          const path = (
            $path !== null
          ) ? $path.concat('.', elementIndex)
            : elementIndex
          // Push Prop Event
          $eventTarget.dispatchEvent(
            new DETEvent(
              'pushProp',
              {
                basename,
                path,
                detail: {
                  elementIndex, 
                  element: $element,
                },
              },
              $eventTarget
            )
          )
          elementIndex++
        }
        // Push Event
        $eventTarget.dispatchEvent(
          new DETEvent(
            'push',
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