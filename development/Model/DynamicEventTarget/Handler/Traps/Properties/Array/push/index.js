import { isDirectInstanceOf } from '../../Coutil/index.js'
import DynamicEventTarget from '../../../../../index.js'
import DETEvent from '../../../../../DynamicEvent/index.js'
export default function Push(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
    schema,
  } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const elements = []
        let elementIndex = 0
        iterateElements:
        for(let $element of arguments) {
          const _basename = elementIndex
          const _path = (
            path !== null
          ) ? path.concat('.', elementIndex)
            : elementIndex
          // Push Prop Event
          if(isDirectInstanceOf(
            $element, [Object, Array/*, Map*/]
          )) {
            $element = new DynamicEventTarget($element, {
              basename: _basename,
              path: _path,
              rootAlias: rootAlias,
            }, schema)
          }
          elements.push($element)
          Array.prototype.push.call(root, $element)
          if(events.includes('pushProp')) {
            eventTarget.dispatchEvent(
              new DETEvent(
                'pushProp',
                {
                  basename: _basename,
                  path: _path,
                  detail: {
                    elementIndex, 
                    element: $element,
                  },
                },
                eventTarget
              )
            )
          }
          elementIndex++
        }
        // Push Event
        if(events.includes('push')) {
          eventTarget.dispatchEvent(
            new DETEvent(
              'push',
              {
                basename,
                path,
                detail: {
                  elements,
                },
              },
              eventTarget
            )
          )
        }
        return root.length
      }
    }  
  )
}