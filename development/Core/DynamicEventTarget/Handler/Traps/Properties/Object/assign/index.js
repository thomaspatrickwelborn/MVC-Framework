import { isDirectInstanceOf } from '../../Coutil/index.js'
import DynamicEventTarget from '../../../../../index.js'
import DETEvent from '../../../../../DynamicEvent/index.js'
export default function Assign(
  $trap, $trapPropertyName, $aliases, $options
) {
  const {
    basename, 
    eventTarget, 
    path, 
    root, 
    rootAlias, 
  } = $aliases
  const { merge } = $options
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
              // Assign Existent Root DET Property
              if(
                merge === true &&
                root[$sourcePropKey]
                ?.constructor.name === 'bound DynamicEventTarget'
              ) {
                root[$sourcePropKey].assign($sourcePropVal)
              } else 
              // Assign Non-Existent Root DET Property
              {
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
                  }
                )
                Object.assign(root, {
                  [$sourcePropKey]: detObject
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
          // Assign Source Event
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
        // Assign Event
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
        return root
      }
    }
  )
}