export default function DefineProperties(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $propertyDescriptors = arguments[0]
        for(let [
          $propertyKey, $propertyDescriptor
        ] of Object.entries($propertyDescriptors)) {
          if(
            typeof $propertyDescriptor.value === 'object' &&
            !$sourcePropVal instanceof DynamicEventTarget
          ) {
            $propertyDescriptor.value = new DynamicEventTarget(
              $propertyDescriptor.value, {
                $rootAlias
              }
            )
          }
          Object.defineProperty(
            $root, $propertyKey, $propertyDescriptor
          )
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