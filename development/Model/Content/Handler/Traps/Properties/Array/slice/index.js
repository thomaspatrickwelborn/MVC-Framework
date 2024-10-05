import { isDirectInstanceOf } from '../../Coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function Splice(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
    schema,
  } = $aliases
  const { enableValidation, validationType } = schema.options
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        // 
      }
    }
  )
}