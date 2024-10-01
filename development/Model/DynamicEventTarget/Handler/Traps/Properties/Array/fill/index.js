import { isDirectInstanceOf } from '../../Coutil/index.js'
import DynamicEventTarget from '../../../../../index.js'
import DETEvent from '../../../../../DynamicEvent/index.js'
export default function Fill(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options
  const {
    $eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
    schema,
  } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $arguments = [...arguments]
        let value = $arguments[0]
        if(isDirectInstanceOf(
          value, [Object, Array/*, Map*/]
        )) {
          value = new DynamicEventTarget(value, {
            rootAlias: rootAlias,
          }, schema)
        }
        let start
        if(
          typeof $arguments[1] === 'number'
        ) {
          start = (
            $arguments[1] >= 0
          ) ? $arguments[1]
            : root.length + $arguments[1]
        } else {
          start = 0
        }
        let end
        if(
          typeof $arguments[2] === 'number'
        ) {
          end = (
            $arguments[2] >= 0
          ) ? $arguments[2]
            : root.length + $arguments[2]
        } else {
          end = root.length
        }
        let fillIndex = start
        while(
          fillIndex < root.length &&
          fillIndex < end
        ) {
          Array.prototype.fill.call(
            root, value, fillIndex, fillIndex + 1
          )
          const _basename = fillIndex
          const _path = (
            path !== null
          ) ? path.concat('.', fillIndex)
            : fillIndex
          // Array Fill Index Event
          if(events.includes('fillIndex')) {
            $eventTarget.dispatchEvent(
              new DETEvent(
                'fillIndex',
                {
                  basename: _basename,
                  path: _path,
                  detail: {
                    start: fillIndex,
                    end: fillIndex + 1,
                    value,
                  },
                },
                $eventTarget
              )
            )
          }
          fillIndex++
        }
        // Array Fill Event
        if(events.includes('fill')) {
          $eventTarget.dispatchEvent(
            new DETEvent(
              'fill',
              {
                basename,
                path,
                detail: {
                  start,
                  end,
                  value,
                },
              },
              $eventTarget
            )
          )
        }
        return root
      }
    }
  )
}