export default function Assign(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        iterateSources: 
        for(let $source of [...arguments]) {
          iterateSourceProps:
          for(let [
            $sourcePropKey, $sourcePropVal
          ] of Object.entries($source)) {
            if(
              typeof $sourcePropVal === 'object' &&
              !$sourcePropVal instanceof DynamicEventTarget
            ) {
              $sourcePropVal = new DynamicEventTarget(
                $sourcePropVal, {
                  $rootAlias
                }
              )
            }
            $root[$sourcePropKey] = $sourcePropVal
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
            $trap.createEvent(
              $eventTarget, 
              'assignSourcePropertyKey',
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
            $root,
          )
        }
        $trap.createEvent(
          $eventTarget,
          'assign',
          {},
        )
        return $root
      }
    }
  )
}