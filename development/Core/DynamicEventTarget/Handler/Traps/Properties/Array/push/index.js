import { isDirectInstanceOf } from '../../Coutil/index.js'
import DynamicEventTarget from '../../../../../index.js'
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
    'push', 
    ($event) => {
      if($eventTarget.parent !== null) {
        const pushEventData = {
          path: $event.path,
          basename: $event.basename,
          elements: $event.detail.elements,
        }
        $trap.createEvent(
          $eventTarget.parent,
          'push',
          pushEventData,
        )
      }
    }
  )
  $eventTarget.addEventListener(
    'pushProp', 
    ($event) => {
      if($eventTarget.parent !== null) {
        const pushPropEventData = {
          path: $event.path,
          basename: $event.basename,
          elementIndex: $event.detail.elementIndex, 
          element: $event.detail.element,
        }
        $trap.createEvent(
          $eventTarget.parent,
          'pushProp', 
          pushPropEventData,
        )
      }
    }
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
          $trap.createEvent(
            $eventTarget,
            'pushProp',
            {
              elementIndex, 
              element: $element,
              path,
              basename,
            },
          )
          elementIndex++
        }
        // Push Event
        $trap.createEvent(
          $eventTarget,
          'push',
          {
            elements,
            path: $path,
            basename: $basename,
          },
        )
        return $root.length
      }
    }  
  )
}