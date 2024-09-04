export default class Proof extends EventTarget {
  #settings
  #options
  #_type = "proof"
  #_title
  #_description
  #_precondition
  #_arguments
  #_conclusion
  constructor($settings = {}, $options = {}) {
    super()
  }
  get title() {
    if(this.#_title !== undefined) return this.#_title
    this.#_title = this.#settings.title
    return this.#_title
  }
  get title() {
    // 
  }
  get description() {
    // 
  }
  get preconditions() {
    // 
  }
  get arguments() {
    // 
  }
  get conclusions() {
    // 
  }
}