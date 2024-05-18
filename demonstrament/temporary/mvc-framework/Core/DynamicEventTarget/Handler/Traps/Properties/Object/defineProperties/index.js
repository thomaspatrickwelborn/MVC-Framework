import DynamicEventTarget from '../../../../../index.js'
export default function DefineProperties(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root, $rootAlias } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $propertyDescriptors = arguments[0]
        for(let [
          $propertyKey, $propertyDescriptor
        ] of Object.entries($propertyDescriptors)) {
          if(typeof $propertyDescriptor.value === 'object') {
            if($root[$propertyKey] instanceof DynamicEventTarget) {
              $root[$propertyKey].defineProperties({
                [$propertyKey]: $propertyDescriptor
              })
            } else {
              $propertyDescriptor.value = new DynamicEventTarget(
                $propertyDescriptor.value, {
                  $rootAlias
                }
              )
              Object.defineProperty(
                $root, $propertyKey, $propertyDescriptor
              )
            }
          } else {
            Object.defineProperty(
              $root, $propertyKey, $propertyDescriptor
            )
          }
          $trap.createEvent(
            $eventTarget,
            'defineProperty',
            {
              prop: $propertyKey,
              descriptor: $propertyDescriptor,
            },
            $root,
          )
          $trap.createEvent(
            $eventTarget,
            'definePropertyKey',
            {
              prop: $propertyKey,
              descriptor: $propertyDescriptor,
            },
            $root,
          )
        }
        $trap.createEvent(
          $eventTarget,
          'defineProperties',
          {
            descriptors: $propertyDescriptors,
          },
        )
        return $root
      }
    }
  )
}