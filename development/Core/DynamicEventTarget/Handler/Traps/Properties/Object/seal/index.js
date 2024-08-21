import DynamicEventTarget from '../../../../../index.js'
export default function Seal(
  $trap, $trapPropertyName, $aliases, $options
) {
  const {
    $eventTarget, 
    $root, 
    $rootAlias, 
    $basename,
    $path,
  } = $aliases
  const { recurse } = $options
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function () {
        if(recurse === true) {
          iterateProperties: 
          for(const [
            $propertyKey, $propertyValue
          ] of Object.entries(this)) {
            if(
              $propertyValue.constructor.name === 'bound DynamicEventTarget'
            ) {
              $propertyValue.addEventListener(
                'seal', ($event) => {
                  const sealEventData = {
                    path: $event.path,
                    basename: $event.basename,
                  }
                  $trap.createEvent(
                    $eventTarget, 
                    'seal',
                    sealEventData,
                    this,
                  )
                }
              )
              $propertyValue.seal()
            } else {
              Object.seal($propertyValue)
            }
            const basename = $propertyKey
            const path = (
              $path !== null
            ) ? $path.concat('.', $propertyKey)
              : $propertyKey
            const sealEventData = {
              path: $path,
              basename: $basename,
            }
            $trap.createEvent(
              $eventTarget,
              'seal',
              sealEventData,
              this
            )
          }
        }
        Object.seal(this)
        return $root
      }
    }
  )
}