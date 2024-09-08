import Control from '/coutil/Control/index.js'
export default class Argument extends Control {
  #_claim
  #_premise
  #_inference
  constructor($model = {}, $view = {}) {
    super($model, Object.assign($view, {
      template: ($content) => `
        <argument>
          <claim>${$content.claim}</claim>
          <premise>${$content.premise}</premise>
          <inference>${$content.inference}</inference>
        </argument>
      `
    }))
    this.render()
  }
  get claim() {
    if(this.#_claim !== undefined) return this.#_claim
    this.#_claim = this.model.claim
    return this.#_claim
  }
  get premise() {
    if(this.#_premise !== undefined) return this.#_premise
    this.#_premise = this.model.premise
    return this.#_premise
  }
  get inference() {
    if(this.#_inference !== undefined) return this.#_inference
    this.#_inference = this.model.inference
    return this.#_inference
  }
}