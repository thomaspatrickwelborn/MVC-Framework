import { isDirectInstanceOf } from '../../Coutil/index.js'
import DynamicEventTarget from '../../../../../index.js'
export default function Fill(
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
    'copyWithin', 
    ($event) => {
      if($eventTarget.parent !== null) {
        const fillEventData = {
          path: $event.path,
          basename: $event.basename,
          start: $event.detail.fillIndex,
          end: $event.detail.fillIndex + 1,
          value: $event.detail.value,
        }
        $trap.createEvent(
          $eventTarget.parent,
          'copyWithin',
          fillEventData,
        )
      }
    }
  )
  $eventTarget.addEventListener(
    'copyWithinIndex', 
    ($event) => {
      if($eventTarget.parent !== null) {
        const fillIndexEventData = {
          path: $event.path,
          basename: $event.basename,
          start: $event.detail.start,
          end: $event.detail.end,
          value: $event.detail.value,
        }
        $trap.createEvent(
          $eventTarget.parent,
          'copyWithinIndex', 
          fillIndexEventData,
        )
      }
    }
  )
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $arguments = [...arguments]
        let value = $arguments[0]
        if(isDirectInstanceOf(
          value, [Object, Array/*, Map*/]
        )) {
          value = new DynamicEventTarget(value, {
            rootAlias: $rootAlias,
          })
        }
        const start = (
          $arguments[1] >= 0
        ) ? $arguments[1]
          : $root.length + $arguments[1]
        const end = (
          $arguments[2] >= 0
        ) ? $arguments[2]
          : $root.length + $arguments[2]
        let fillIndex = start
        while(
          fillIndex < $root.length &&
          fillIndex < end
        ) {
          Array.prototype.fill.call(
            $root, value, fillIndex, fillIndex + 1
          )
          // Array Fill Index Event Data
          const fillIndexEventData = {
            start: fillIndex,
            end: fillIndex + 1,
            value,
            path: $path,
            basename: $basename,
          }
          // Array Fill Index Event
          $trap.createEvent(
            $eventTarget,
            'fillIndex',
            fillIndexEventData,
          )
          fillIndex++
        }
        // Array Fill Event Data
        const fillEventData = {
          start,
          end,
          value,
          path: $path,
          basename: $basename,
        }
        // Array Fill Event
        $trap.createEvent(
          $eventTarget,
          'fill',
          fillEventData,
        )
        return $root
      }
    }
  )
}