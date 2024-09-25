import { isDirectInstanceOf } from '../../../../../../Coutil/index.js'
import Model from '../../../../../index.js'
import ModelEvent from '../../../../../ModelEvent/index.js'
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
  } = $aliases
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
            // Assign Root Model Property
            if(
              isDirectInstanceOf(
                $sourcePropVal, [Object, Array/*, Map*/]
              )
            ) {
              // Merge
              if(merge === true) {
                // Assign Existent Root Model Property
                if(
                  root[$sourcePropKey]
                  ?.constructor.name === 'bound Model'
                ) {
                  root[$sourcePropKey].assign($sourcePropVal)
                } else 
                // Assign Non-Existent Root Model Property
                {
                  const _basename = $sourcePropKey
                  const _path = (
                    path !== null
                  ) ? path.concat('.', $sourcePropKey)
                    : $sourcePropKey
                  const model = new Model(
                    { content: $sourcePropVal }, {
                      basename: _basename,
                      parent: eventTarget,
                      path: _path,
                      rootAlias,
                    }
                  )
                  Object.assign(root, {
                    [$sourcePropKey]: model
                  })
                }
              } else
              // No Merge
              if(merge === false) {
                const _basename = $sourcePropKey
                const _path = (
                  path !== null
                ) ? path.concat('.', $sourcePropKey)
                  : $sourcePropKey
                const model = new Model(
                  { content: $sourcePropVal }, {
                    basename: _basename,
                    parent: eventTarget,
                    path: _path,
                    rootAlias,
                  }
                )
                Object.assign(root, {
                  [$sourcePropKey]: model
                })
              }
            } else 
            // Assign Root Property
            {
              Object.assign(root, {
                [$sourcePropKey]: $sourcePropVal
              })
            }
            // Assign Source Property Event
            if(events.includes('assignSourceProperty')) {
              eventTarget.dispatchEvent(
                new ModelEvent(
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
              new ModelEvent(
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
            new ModelEvent(
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