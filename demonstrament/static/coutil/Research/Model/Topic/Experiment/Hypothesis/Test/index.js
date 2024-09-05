import Proof from './Proof/index.js'
export default class Test extends EventTarget {
  #settings
  #_id
  #type = "test"
  #_title
  #_proofs
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
  get proofs() {
    if(this.#_proofs !== undefined) return this.#_proofs
    this.#_proofs = []
    let proofIndex = 0
    for(const $proof of this.#settings.proofs) {
      this.#_proofs.push(
        new Proof(Object.assign($proof, { id: proofIndex }))
      )
      proofIndex++
    }
    return this.#_proofs
  }
}