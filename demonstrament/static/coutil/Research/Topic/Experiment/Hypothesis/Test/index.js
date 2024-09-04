import Proof from './Proof/index.js'
export default class Test extends EventTarget {
  #settings
  #options
  #_type = "test"
  constructor($settings = {}, $options = {}) {
    super()
  }
  get title() {
    if(this.#_title !== undefined) return this.#_title
    this.#_title = this.#settings.title
    return this.#_title
  }
  get proofs() {
    if(this.#_proofs !== undefined) return this.#_proofs
    this.#_proofs = []
    for(const $proof of this.#settings.proofs) {
      new Proof()
    }
    return this.#_proofs
  }
}