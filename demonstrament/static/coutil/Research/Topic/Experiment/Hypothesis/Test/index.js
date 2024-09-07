import Control from '/coutil/Control/index.js'
import Proof from './Proof/index.js'
export default class Test extends Control {
  #_title
  #_id
  #type = "test"
  #_proofs
  constructor($model = {}, $view = {}) {
    super($model, Object.assign($view, {
      template: ($content) => `
        <test>
          <h5>${$content.title}</h5>
          <proofs></proofs>
        </test>
      `,
      querySelectors: {
        test: ':scope > test',
        title: ':scope > test > h5',
        proofs: ':scope > test > proofs',
      },
    }))
    this.render()
    this.proofs
  }
  get id() {
    if(this.#_id !== undefined) return this.#_id
    this.#_id = this.model.id
    return this.#_id
  }
  get title() {
    if(this.#_title !== undefined) return this.#_title
    this.#_title = this.model.title
    return this.#_title
  }
  get proofs() {
    if(this.#_proofs !== undefined) return this.#_proofs
    this.#_proofs = []
    let proofIndex = 0
    for(const $proof of this.model.proofs) {
      this.#_proofs.push(
        new Proof(
          Object.assign($proof, { id: proofIndex }),
          { parent: this.querySelectors.proofs },
        )
      )
      proofIndex++
    }
    return this.#_proofs
  }
}