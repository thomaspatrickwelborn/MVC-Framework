import {
  typeOf,
  isDirectInstanceOf,
} from '../../../../../../Coutil/index.js'
import Model from '../../../../../index.js'
import ModelEvent from '../../../../../ModelEvent/index.js'
export default function Seal(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { recurse, events } = $options
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path,
  } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function () {
        if(recurse === true) {
          iterateProperties: 
          for(const [
            $propertyKey, $propertyValue
          ] of Object.entries(this)) {
            if(
              $propertyValue.constructor.name === 'bound Model'
            ) {
              $propertyValue.seal()
            } else {
              Object.seal($propertyValue)
            }
            const basename = $propertyKey
            const path = (
              path !== null
            ) ? path.concat('.', $propertyKey)
              : $propertyKey
            if(events.includes('seal')) {
              eventTarget.dispatchEvent(
                new ModelEvent(
                  'seal',
                  {
                    path,
                    basename,
                  },
                  eventTarget
                )
              )
            }
          }
        }
        Object.seal(this)
        return root
      }
    }
  )
}