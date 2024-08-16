import { isDirectInstanceOf } from '../../../../../../../Utils/index.js'
import DynamicEventTarget from '../../../../../index.js'
export default function Assign(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { $eventTarget, $root, $rootAlias } = $aliases
  const { merge } = $options
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const sources = [...arguments]
        iterateSources: 
        for(let $source of sources) {
          iterateSourceProps:
          for(let [
            $sourcePropKey, $sourcePropVal
          ] of Object.entries($source)) {
            if(
              isDirectInstanceOf(
                $sourcePropVal, [Array, Object, Map]
              )
            ) {
              if(
                merge === true &&
                $root[$sourcePropKey].constructor.name === 'bound DynamicEventTarget'
              ) {
                $root[$sourcePropKey].assign($sourcePropVal)
              } else {
                Object.assign($root, {
                  [$sourcePropKey]: new DynamicEventTarget($sourcePropVal, {
                    $rootAlias,
                  })
                })
              }
            } else {
              Object.assign($root, {
                [$sourcePropKey]: $sourcePropVal
              })
            }
            $trap.createEvent(
              $eventTarget, 
              'assignSourceProperty',
              {
                key: $sourcePropKey,
                val: $sourcePropVal,
                source: $source,
              },
              $root,
            )
          }
          $trap.createEvent(
            $eventTarget,
            'assignSource',
            {
              source: $source,
            },
            $root
          )
        }
        $trap.createEvent(
          $eventTarget,
          'assign',
          {
            sources
          },
          $root,
        )
        return $root
      }
    }
  )
}