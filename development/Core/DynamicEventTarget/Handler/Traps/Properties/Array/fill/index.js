import { isDirectInstanceOf } from '../../Coutil/index.js'
import DynamicEventTarget from '../../../../../index.js'
export default function Fill(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root, $rootAlias } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $arguments = [...arguments]
        let value = $arguments[0]
        if(isDirectInstanceOf(
          $sourcePropVal, [Array, Object, Map]
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
          // Array Fill Index Event
          $trap.createEvent(
            $eventTarget,
            'fillIndex',
            {
              start: fillIndex,
              end: fillIndex + 1,
              value,
            },
          )
          fillIndex++
        }
        // Array Fill Event
        $trap.createEvent(
          $eventTarget,
          'fill',
          { start, end, value },
        )
        return $root
      }
    }
  )
}