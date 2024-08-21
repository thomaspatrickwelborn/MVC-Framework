export default function Length(
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
    'lengthSet', 
    ($event) => {
      if($eventTarget.parent !== null) {
        const lengthEventData = {
          path: $event.path,
          basename: $event.basename,
          length: $event.detail.length,
        }
        $trap.createEvent(
          $eventTarget.parent,
          'lengthSet',
          lengthEventData,
        )
      }
    }
  )
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      get() { return $root.length },
      set($length) {
        $root.length = $length
        // Array Length Set Event
        const lengthEventData = {
          path: $path,
          basename: $basename,
          length: $root.length,
        }
        $trap.createEvent(
          $eventTarget,
          'lengthSet',
          lengthEventData
        )
      },
    }
  )
}