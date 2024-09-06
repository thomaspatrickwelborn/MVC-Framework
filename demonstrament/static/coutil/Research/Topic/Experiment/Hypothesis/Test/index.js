import Proof from './Proof/index.js'
export default class Test extends EventTarget {
  #model
  #view
  #_parent
  #_template
  #_querySelectors
  #_title
  #_id
  #type = "test"
  #_proofs
  constructor($model = {}, $view = {}) {
    super()
    this.#model = $model
    this.#view = $view
    this.render()
  }
  get parent() {
    if(this.#_parent !== undefined) return this.#_parent
    this.#_parent = this.#view.parent
    return this.#_parent
  }
  get template() {
    if(this.#_template !== undefined) return this.#_template
    this.#_template = document.createElement('template')
    this.#_template.innerHTML = `<test>
      <h5>${this.title}</h5>
      <proofs></proofs>
    </test>`
    return this.#_template
  }
  get querySelectors() {
    if(this.#_querySelectors !== undefined) return this.#_querySelectors
    this.#_querySelectors = {
      test: this.parent.querySelector(':scope > test'),
      title: this.parent.querySelector(':scope > test > h5'),
      proofs: this.parent.querySelector(':scope > test > proofs'),
    }
    return this.#_querySelectors
  }
  get id() {
    if(this.#_id !== undefined) return this.#_id
    this.#_id = this.#model.id
    return this.#_id
  }
  get title() {
    if(this.#_title !== undefined) return this.#_title
    this.#_title = this.#model.title
    return this.#_title
  }
  get proofs() {
    if(this.#_proofs !== undefined) return this.#_proofs
    this.#_proofs = []
    let proofIndex = 0
    for(const $proof of this.#model.proofs) {
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
  render() {
    this.parent.appendChild(
      this.template.content
    )
    for(const $proof of this.proofs) {
      $proof.render()
    }
    return this
  }
}