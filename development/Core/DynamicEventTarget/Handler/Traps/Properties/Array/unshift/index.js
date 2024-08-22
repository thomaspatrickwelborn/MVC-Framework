import { isDirectInstanceOf } from '../../Coutil/index.js'
import DynamicEventTarget from '../../../../../index.js'
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
  $eventTarget.addEventListener(
    'unshift', 
    ($event) => {
      if($eventTarget.parent !== null) {
        const unshiftEventData = {
          path: $event.path,
          basename: $event.basename,
          elements: $event.detail.elements,
        }
        $trap.createEvent(
          $eventTarget.parent,
          'unshift',
          unshiftEventData,
        )
      }
    }
  )
  $eventTarget.addEventListener(
    'unshiftProp', 
    ($event) => {
      if($eventTarget.parent !== null) {
        const unshiftPropEventData = {
          path: $event.path,
          basename: $event.basename,
          elementIndex: $event.detail.elementIndex, 
          element: $event.detail.element,
        }
        $trap.createEvent(
          $eventTarget.parent,
          'unshiftProp', 
          unshiftPropEventData,
        )
      }
    }
  )
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
          $trap.createEvent(
            $eventTarget,
            'unshiftProp',
            {
              elementIndex, 
              element: element,
              path,
              basename,
            },
            $root,
          )
          elementIndex--
        }
        // Array Unshift Event
        const basename = elementIndex
        const path = (
          $path !== null
        ) ? $path.concat('.', elementIndex)
          : elementIndex
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