import {
  typeOf,
  isDirectInstanceOf,
} from '../../Coutil/index.js'
import DynamicEventTarget from '../../../../../index.js'
import DETEvent from '../../../../../DynamicEvent/index.js'
import DETEventBubble from '../../../../../DynamicEvent/DynamicEventBubble/index.js'
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
                'seal', DETEventBubble
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
              new DETEvent(
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