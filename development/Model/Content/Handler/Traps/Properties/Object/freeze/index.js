import {
  typeOf,
  isDirectInstanceOf,
} from '../../Coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function Freeze(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { recurse, events } = $options
  const {
    eventTarget, 
    root, 
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
              $propertyValue.constructor.name === 'bound Content'
            ) {
              $propertyValue.freeze()
            } else {
              Object.freeze($propertyValue)
            }
            const _basename = $propertyKey
            const _path = (
              path !== null
            ) ? path.concat('.', $propertyKey)
              : $propertyKey
            if(events.includes('freeze')) {
              eventTarget.dispatchEvent(
                new ContentEvent(
                  'freeze',
                  {
                    path: _path,
                    basename: _basename,
                  },
                  eventTarget
                )
              )
            }
          }
        }
        Object.freeze(this)
        return root
      }
    }
  )
}