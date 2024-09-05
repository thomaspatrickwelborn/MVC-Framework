import Argument from './Argumeent/index.js'
import Conclusion from './Conclusion/index.js'
import Precondition from './Precondition/index.js'
export default class Proof extends EventTarget {
  #settings
  #_parent
  constructor($settings = {}) {
    super()
    this.#settings = $settings
  }
  get parent() {
    if(this.#_parent !== undefined) return this.#_parent
    this.#_parent = this.#settings.parent
    return this.#_parent
  } 
}