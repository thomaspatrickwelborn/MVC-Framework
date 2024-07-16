import DynamicEventTarget from '../../../../../index.js'
export default function Seal(
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
              $propertyValue.seal()
            }
          }
        }
        Object.seal($root)
        $trap.createEvent(
          $eventTarget,
          'seal',
          {},
          $root
        )
        return $root
      }
    }
  )
}