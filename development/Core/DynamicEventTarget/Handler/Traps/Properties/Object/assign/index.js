import { isDirectInstanceOf } from '../../Coutil/index.js'
import DynamicEventTarget from '../../../../../index.js'
import DETEvent from '../../../../../DynamicEvent/index.js'
import DETEventBubble from '../../../../../DynamicEvent/DynamicEventBubble/index.js'
export default function Assign(
  $trap, $trapPropertyName, $aliases, $options
) {
  const {
    $eventTarget, 
    $root, 
    $rootAlias, 
    $basename,
    $path, 
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
                $root[$sourcePropKey]
                ?.constructor.name === 'bound DynamicEventTarget'
              ) {
                $root[$sourcePropKey].assign($sourcePropVal)
              } else 
              // Assign Non-Existent Root DET Property
              {
                const basename = $sourcePropKey
                const path = (
                  $path !== null
                ) ? $path.concat('.', $sourcePropKey)
                  : $sourcePropKey
                const detObject = new DynamicEventTarget(
                  $sourcePropVal, {
                    $rootAlias,
                    $path: path,
                    $basename: basename,
                    $parent: $eventTarget
                  }
                )
                detObject.addEventListener(
                  'assignSourceProperty', DETEventBubble
                )
                detObject.addEventListener(
                  'assignSource', DETEventBubble
                )
                detObject.addEventListener(
                  'assign', DETEventBubble
                )
                Object.assign($root, {
                  [$sourcePropKey]: detObject
                })
              }
            } else 
            // Assign Root Property
            {
              Object.assign($root, {
                [$sourcePropKey]: $sourcePropVal
              })
            }
            // Assign Source Property Event
            $eventTarget.dispatchEvent(
              new DETEvent(
                'assignSourceProperty',
                {
                  path: $path,
                  basename: $basename,
                  detail: {
                    key: $sourcePropKey,
                    val: $sourcePropVal,
                    source: $source,
                  }
                },
              )
            )
          }
          // Assign Source Event
          $eventTarget.dispatchEvent(
            new DETEvent(
              'assignSource',
              {
                path: $path,
                basename: $basename,
                detail: {
                  source: $source,
                },
              }
            )
          )
        }
        // Assign Event
        $eventTarget.dispatchEvent(
          new DETEvent(
            'assign',
            { 
              basename: $basename,
              path: $path,
              detail: {
                sources
              },
            }
          )
        )
        return $root
      }
    }
  )
}