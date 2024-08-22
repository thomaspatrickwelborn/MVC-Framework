import { isDirectInstanceOf } from '../../Coutil/index.js'
import DynamicEventTarget from '../../../../../index.js'
import {
  DynamicEvent,
  DynamicEventBubble,
} from '../../../Events/index.js'
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
  $eventTarget.addEventListener(
    'push', DynamicEventBubble
  )
  $eventTarget.addEventListener(
    'pushProp', DynamicEventBubble
  )
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
            new DynamicEvent(
              'pushProp',
              {
                basename,
                path,
                detail: {
                  elementIndex, 
                  element: $element,
                },
              },
            )
          )
          elementIndex++
        }
        // Push Event
        $eventTarget.dispatchEvent(
          new DynamicEvent(
            'push',
            {
              basename: $basename,
              path: $path,
              detail: {
                elements,
              },
            },
          )
        )
        return $root.length
      }
    }  
  )
}