import DynamicEventTarget from '../../../../../index.js'
export default function Freeze(
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
                'freeze', ($event) => {
                  const freezeEventData = {
                    path: $event.path,
                    basename: $event.basename,
                  }
                  $trap.createEvent(
                    $eventTarget, 
                    'freeze',
                    freezeEventData,
                    this,
                  )
                }
              )
              $propertyValue.freeze()
            } else {
              Object.freeze($propertyValue)
            }
            const basename = $propertyKey
            const path = (
              $path !== null
            ) ? $path.concat('.', $propertyKey)
              : $propertyKey
            const freezeEventData = {
              path: $path,
              basename: $basename,
            }
            $trap.createEvent(
              $eventTarget,
              'freeze',
              freezeEventData,
              this
            )
          }
        }
        Object.freeze(this)
        return $root
      }
    }
  )
}