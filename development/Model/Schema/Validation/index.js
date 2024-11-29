import Valence from "../Valence/index.js"
export default class Validation extends Valence {
  #_advance = []
  #_deadvance = []
  #_unadvance = []
  #_valid
  #_properties
  constructor() {
    super(...arguments)
  }
  get advance() { return this.#_advance }
  get deadvance() { return this.#_deadvance }
  get unadvance() { return this.#_unadvance }
  get properties() {
    if(this.#_properties !== undefined) return this.#_properties
    this.#_properties = this.settings.properties
    return this.#_properties
  }
}