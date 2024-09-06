export default class Argument extends EventTarget {
  #model
  #view
  #_parent
  #_template
  #_querySelectors
  #_id
  #_claim
  #_premise
  #_inference
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
    this.#_template.innerHTML = `<argument>
      <claim>${this.claim}</claim>
      <premise>${this.premise}</premise>
      <inference>${this.inference}</inference>
    </argument>`
    return this.#_template
  }
  get querySelectors() {
    if(this.#_querySelectors !== undefined) return this.#_querySelectors
    this.#_querySelectors = {}
    return this.#_querySelectors
  }
  get id() {
    if(this.#_id !== undefined) return this.#_id
    this.#_id = this.#model.id
    return this.#_id
  }
  get claim() {
    if(this.#_claim !== undefined) return this.#_claim
    this.#_claim = this.#model.claim
    return this.#_claim
  }
  get premise() {
    if(this.#_premise !== undefined) return this.#_premise
    this.#_premise = this.#model.premise
    return this.#_premise
  }
  get inference() {
    if(this.#_inference !== undefined) return this.#_inference
    this.#_inference = this.#model.inference
    return this.#_inference
  }
  render() {
    this.parent.appendChild(
      this.template.content
    )
    return this
  }
}