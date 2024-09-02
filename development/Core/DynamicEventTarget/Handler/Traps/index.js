import Trap from './Trap/index.js'
import PropertyClasses from './Properties/index.js'

export default class Traps {
  Object
  Array
  // Map
  constructor($settings, $options) {
    // Iterate Property Classes
    iteratePropertyClasses:
    for(let [
      PropertyClassName, PropertyClassMethods
    ] of Object.entries(PropertyClasses)) {
      const trapOptions = $options[PropertyClassName.toLowerCase()]
      const trap = new Trap(PropertyClassMethods, $settings, trapOptions)
      Object.defineProperty(
        this, PropertyClassName, {
          value: trap
        }
      )
    }
  }
}