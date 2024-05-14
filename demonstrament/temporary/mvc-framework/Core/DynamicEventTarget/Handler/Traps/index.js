import Trap from './Trap/index.js'
import PropertyClasses from './Properties/index.js'

export default class Traps {
  constructor($aliases) {
    // Iterate Property Classes
    iteratePropertyClasses:
    for(let [
      PropertyClassName, PropertyClassMethods
    ] of Object.entries(PropertyClasses)) {
      const trap = new Trap(PropertyClassMethods, $aliases)
      Object.defineProperty(
        this, PropertyClassName, {
          value: new Trap(PropertyClassMethods, $aliases)
        }
      )
    }
  }
  Object
  Array
  Map
}