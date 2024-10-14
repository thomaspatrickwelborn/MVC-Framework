import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
import GetContent from './getContent/index.js'
import GetContentProperty from './getContentProperty/index.js'
export default function GetProperty($content, $options) {
  const getContent = GetContent(...arguments)
  const getContentProperty = GetContentProperty(...arguments)
  return function getProperty() {
    // -----------------------------
    // Get Content Method Invocation
    // -----------------------------
    if((
      // Unulteroptions
      arguments.length === 0
    ) || (
      // Ulteroptions
      arguments.length === 1 &&
      typeof arguments[0] === 'object'
    )) { return getContent(...arguments) }
    // --------------------------------------
    // Get Content Property Method Invocation
    // --------------------------------------
    else if((
      // Unulteroptions
      arguments.length === 1 &&
      typeof arguments[0] === 'string'
    ) || (
      // Ulteroptions
      arguments.length === 2 &&
      typeof arguments[0] === 'string' &&
      typeof arguments[1] === 'object'
    )) { return getContentProperty(...arguments) }
  }
}