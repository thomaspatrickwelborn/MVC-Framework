import DynamicEventTarget from '../../../../../index.js'
export default function Freeze(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { $eventTarget, $root } = $aliases
  const { recurse } = $options
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function () {
        if(recurse === true) {
          for(const $propertyValue of Object.values($root)) {
            if($propertyValue instanceof DynamicEventTarget) {
              $propertyValue.freeze()
            }
          }
        }
        Object.freeze($root)
        $trap.createEvent(
          $eventTarget,
          'freeze',
          {},
          $root
        )
        return $root
      }
    }
  )
}