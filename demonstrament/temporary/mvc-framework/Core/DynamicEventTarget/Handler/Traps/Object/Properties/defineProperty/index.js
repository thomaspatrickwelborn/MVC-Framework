export default function DefineProperty(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        let propertyKey = arguments[0]
        let propertyDescriptor = arguments[1]
        if(
          typeof propertyDescriptor.value === 'object' &&
          !$sourcePropVal instanceof DynamicEventTarget
        ) {
          propertyDescriptor.value = new DynamicEventTarget(
            propertyDescriptor.value, {
              $rootAlias
            }
          )
        }
        Object.defineProperty(
          $root, propertyKey, propertyDescriptor
        )
        $trap.createEvent(
          $eventTarget,
          'defineProperty',
          {
            prop: $propertyKey,
            descriptor: $propertyDescriptor,
          },
        )
        $trap.createEvent(
          $eventTarget,
          'definePropertyKey',
          {
            prop: $propertyKey,
            descriptor: $propertyDescriptor,
          },
        )
        return $root
      }
    }
  )
}