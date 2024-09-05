export default class Proof extends EventTarget {
  #settings
  #options
  #type = "proof"
  #_id
  #_title
  #_description
  #_precondition
  #_arguments
  #_conclusion
  constructor($settings = {}) {
    super()
  }
  get id() {
    if(this.#_id !== undefined) return this.#_id
    this.#_id = this.#settings.id
    return this.#_id
  }
  get title() {
    if(this.#_title !== undefined) return this.#_title
    this.#_title = this.#settings.title
    return this.#_title
  }
  get description() {
    // 
  }
  get preconditions() {
    if(this.#_preconditions !== undefined) return this.#_preconditions
    this.#_preconditions = []
    let preconditionIndex = 0
    for(const $precondition of this.#settings.preconditions) {
      this.#_preconditions.push(
        new Precondition(Object.assign($precondition, { id: preconditionIndex }))
      )
      preconditionIndex++
    }
    return this.#_preconditions
  }
  get arguments() {
    if(this.#_arguments !== undefined) return this.#_arguments
    this.#_arguments = []
    let argumentIndex = 0
    for(const $argument of this.#settings.arguments) {
      this.#_arguments.push(
        new Argument(Object.assign($argument, { id: argumentIndex }))
      )
      argumentIndex++
    }
    return this.#_arguments
  }
  get conclusions() {
    if(this.#_conclusions !== undefined) return this.#_conclusions
    this.#_conclusions = []
    let conclusionIndex = 0
    for(const $conclusion of this.#settings.conclusions) {
      this.#_conclusions.push(
        new Conclusion(Object.assign($conclusion, { id: conclusionIndex }k))
      )
      conclusionIndex++
    }
    return this.#_conclusions
  }
}