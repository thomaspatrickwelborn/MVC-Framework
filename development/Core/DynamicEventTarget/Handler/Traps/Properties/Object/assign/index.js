import { isDirectInstanceOf } from '../../Coutil/index.js'
import DynamicEventTarget from '../../../../../index.js'
export default function Assign(
  $trap, $trapPropertyName, $aliases, $options
) {
  const {
    $eventTarget, 
    $root, 
    $rootAlias, 
    $baseAlias, 
    $basename,
    $path, 
  } = $aliases
  const $base = $eventTarget[$baseAlias]
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
                $root[$sourcePropKey]
                ?.constructor.name === 'bound DynamicEventTarget'
              ) {
                $root[$sourcePropKey].assign($sourcePropVal)
              } else {
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
            } else {
              Object.assign($root, {
                [$sourcePropKey]: $sourcePropVal
              })
            }
            const assignSourcePropertyEventData = {
              key: $sourcePropKey,
              val: $sourcePropVal,
              source: $source,
              path: $path,
              basename: $basename,
            }
            $trap.createEvent(
              $eventTarget, 
              'assignSourceProperty',
              assignSourcePropertyEventData,
              $root,
            )
          }
          const assignSourceEventData = {
            source: $source,
            path: $path,
            basename: $basename,
          }
          $trap.createEvent(
            $eventTarget,
            'assignSource',
            assignSourceEventData,
            $root
          )
        }
        const assignEventData = {
          sources,
          path: $path,
          basename: $basename,
        }
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