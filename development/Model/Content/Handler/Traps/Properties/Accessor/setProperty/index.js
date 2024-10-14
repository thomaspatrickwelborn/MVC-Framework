import SetContent from './setContent/index.js'
import SetContentProperty from './setContentProperty/index.js'
export default function SetProperty($content, $options) {
  const setContent = SetContent(...arguments)
  const setContentProperty = SetContentProperty(...arguments)
  return function setProperty() {
    // -----------------------------
    // Set Content Method Invocation
    // -----------------------------
    if((
      // Unulteroptions
      arguments.length === 1 &&
      typeof arguments[0] === 'object'
    ) || (
      // Ulteroptions
      arguments.length === 2 &&
      typeof arguments[0] === 'object' &&
      typeof arguments[1] === 'object'
    )) { return setContent(...arguments) }
    // --------------------------------------
    // Set Content Property Method Invocation
    // --------------------------------------
    else if((
      // Unulteroptions
      arguments.length === 2 &&
      typeof arguments[0] === 'string'
    ) || (
      // Ulteroptions
      arguments.length === 3 &&
      typeof arguments[0] === 'string' &&
      typeof arguments[2] === 'object'
    )) { return setContentProperty(...arguments) }
  }
}