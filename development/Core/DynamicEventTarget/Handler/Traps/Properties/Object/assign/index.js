import { isDirectInstanceOf } from '../../Coutil/index.js'
import DynamicEventTarget from '../../../../../index.js'
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
                  'assignSourceProperty', ($event) => {
                    const assignSourcePropertyEventData = {
                      key: $event.detail.key,
                      val: $event.detail.val,
                      source: $event.detail.source,
                      path: $event.path,
                      basename: $event.basename,
                    }
                    $trap.createEvent(
                      $eventTarget, 
                      'assignSourceProperty',
                      assignSourcePropertyEventData,
                      $root,
                    )
                  }
                )
                detObject.addEventListener(
                  'assignSource', ($event) => {
                    const assignSourceEventData = {
                      source: $event.detail.source,
                      path: $event.path,
                      basename: $event.basename,
                    }
                    $trap.createEvent(
                      $eventTarget,
                      'assignSource',
                      assignSourceEventData,
                      $root
                    )
                  }
                )
                detObject.addEventListener(
                  'assign', ($event) => {
                    const assignEventData = {
                      sources: $event.detail.sources,
                      path: $event.path,
                      basename: $event.basename,
                    }
                    $trap.createEvent(
                      $eventTarget,
                      'assign',
                      assignEventData,
                      $root,
                    )
                  }
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
            // Assign Source Property Event Data
            const assignSourcePropertyEventData = {
              key: $sourcePropKey,
              val: $sourcePropVal,
              source: $source,
              path: $path,
              basename: $basename,
            }
            // Assign Source Property Event
            $trap.createEvent(
              $eventTarget, 
              'assignSourceProperty',
              assignSourcePropertyEventData,
              $root,
            )
          }
          // Assign Source Event Data
          const assignSourceEventData = {
            source: $source,
            path: $path,
            basename: $basename,
          }
          // Assign Source Event
          $trap.createEvent(
            $eventTarget,
            'assignSource',
            assignSourceEventData,
            $root
          )
        }
        // Assign Event Data
        const assignEventData = {
          sources,
          path: $path,
          basename: $basename,
        }
        // Assign Event
        $trap.createEvent(
          $eventTarget,
          'assign',
          assignEventData,
          $root,
        )
        return $root
      }
    }
  )
}