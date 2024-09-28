import { isDirectInstanceOf } from '../../Coutil/index.js'
import DynamicEventTarget from '../../../../../index.js'
import DETEvent from '../../../../../DynamicEvent/index.js'
export default function Assign(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { merge, events } = $options
  const {
    basename, 
    eventTarget, 
    path, 
    root, 
    rootAlias, 
    schema,
  } = $aliases
  const { validation } = schema?.options
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const sources = [...arguments]
        // Iterate Sources
        iterateSources: 
        for(let $source of sources) {
          // Iterate Source Props
          iterateSourceProps:
          for(let [
            $sourcePropKey, $sourcePropVal
          ] of Object.entries($source)) {
            // Assign Root DET Property
            if(
              isDirectInstanceOf(
                $sourcePropVal, [Object, Array/*, Map*/]
              )
            ) {
              // Merge
              if(merge === true) {
                // Assign Existent Root DET Property
                if(
                  root[$sourcePropKey]
                  ?.constructor.name === 'bound DynamicEventTarget'
                ) {
                  root[$sourcePropKey].assign($sourcePropVal)
                }
                // Assign Non-Existent Root DET Property
                else {
                  const _basename = $sourcePropKey
                  const _path = (
                    path !== null
                  ) ? path.concat('.', $sourcePropKey)
                    : $sourcePropKey
                  const detObject = new DynamicEventTarget(
                    $sourcePropVal, {
                      basename: _basename,
                      parent: eventTarget,
                      path: _path,
                      rootAlias,
                    }, schema
                  )
                  Object.assign(root, {
                    [$sourcePropKey]: detObject
                  })
                }
              }
              // No Merge
              else if(merge === false) {
                const _basename = $sourcePropKey
                const _path = (
                  path !== null
                ) ? path.concat('.', $sourcePropKey)
                  : $sourcePropKey
                const detObject = new DynamicEventTarget(
                  $sourcePropVal, {
                    basename: _basename,
                    parent: eventTarget,
                    path: _path,
                    rootAlias,
                  }, schema
                )
                Object.assign(root, {
                  [$sourcePropKey]: detObject
                })
              }
            }
            // Assign Root Property
            else {
              Object.assign(root, {
                [$sourcePropKey]: $sourcePropVal
              })
            }
            // Assign Source Property Event
            if(events.includes('assignSourceProperty')) {
              eventTarget.dispatchEvent(
                new DETEvent(
                  'assignSourceProperty',
                  {
                    basename,
                    path,
                    detail: {
                      key: $sourcePropKey,
                      val: $sourcePropVal,
                      source: $source,
                    }
                  },
                  eventTarget
                )
              )
            }
          }
          // Assign Source Event
          if(events.includes('assignSource')) {
            eventTarget.dispatchEvent(
              new DETEvent(
                'assignSource',
                {
                  basename,
                  path,
                  detail: {
                    source: $source,
                  },
                },
                eventTarget
              )
            )
          }
        }
        // Assign Event
        if(events.includes('assign')) {
          eventTarget.dispatchEvent(
            new DETEvent(
              'assign',
              { 
                basename,
                path,
                detail: {
                  sources
                },
              },
              eventTarget
            )
          )
        }
        return root
      }
    }
  )
}