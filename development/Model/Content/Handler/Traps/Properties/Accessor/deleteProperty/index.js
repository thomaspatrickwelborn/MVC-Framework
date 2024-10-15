import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
import DeleteContent from './deleteContent/index.js'
import DeleteContentProperty from './deleteContentProperty/index.js'
export default function DeleteProperty($content, $options) {
  const deleteContent = DeleteContent(...arguments)
  const deleteContentProperty = DeleteContentProperty(...arguments)
  return function deleteProperty() {
    // --------------------------------
    // Delete Content Method Invocation
    // --------------------------------
    if((
      // Unulteroptions
      arguments.length === 0
    ) || (
      // Ulteroptions
      arguments.length === 1 &&
      typeof arguments[0] === 'object'
    )) { return deleteContent(...arguments) }
    // -----------------------------------------
    // Delete Content Property Method Invocation
    // -----------------------------------------
    else if((
      // Unulteroptions
      arguments.length === 1 &&
      typeof arguments[0] === 'string'
    ) || (
      // Ulteroptions
      arguments.length === 2 &&
      typeof arguments[0] === 'string' &&
      typeof arguments[1] === 'object'
    )) { return deleteContentProperty(...arguments) }
  }
}