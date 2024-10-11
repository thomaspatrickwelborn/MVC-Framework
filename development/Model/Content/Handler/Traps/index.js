import Trap from './Trap/index.js'
import PropertyClasses from './Properties/index.js'

export default class Traps {
  #content
  Object // Trap
  Array // Trap
  Accessor // Trap
  constructor($content) {
    this.#content = $content
    // Iterate Property Classes
    iteratePropertyClasses:
    for(let [
      PropertyClassName, PropertyClassMethods
    ] of Object.entries(PropertyClasses)) {
      const trapOptions = this.#content.options.traps[
        PropertyClassName.toLowerCase()
      ]
      // Property Class Trap (Object, Array, Accessor)
      Object.defineProperty(
        this, PropertyClassName, {
          value: new Trap(
            PropertyClassMethods, this.#content, trapOptions
          )
        }
      )
    }
  }
}