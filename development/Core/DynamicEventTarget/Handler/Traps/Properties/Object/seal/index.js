import {
  typeOf,
  isDirectInstanceOf,
  parseDEBD,
} from '../../Coutil/index.js'
import DynamicEventTarget from '../../../../../index.js'
import DynamicEvent from '../../../Events/DynamicEvent/index.js'
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
                  $eventTarget.dispatchEvent(
                    new DynamicEvent(
                      ...parseDEBD($event)
                    )
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
            $eventTarget.dispatchEvent(
              new DynamicEvent(
                'seal',
                {
                  path: $path,
                  basename: $basename,
                },
              )
            )
          }
        }
        Object.seal(this)
        return $root
      }
    }
  )
}