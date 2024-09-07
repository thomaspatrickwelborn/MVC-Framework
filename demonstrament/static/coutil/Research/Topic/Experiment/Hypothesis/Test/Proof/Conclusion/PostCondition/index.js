import Control from '/coutil/Control/index.js'
export default class PostCondition extends Control {
  #_id
  #_label
  #_premise
  constructor($model = {}, $view = {}) {
    super($model, Object.assign($view, {
      template: ($content) => `
        <postcondition>
          <label>${$content.label}</label>
          <premise>${$content.premise}</premise>
        </postcondition>
      `,
      querySelectors: {},
    }))
    this.render()
  }
  get id() {
    if(this.#_id !== undefined) return this.#_id
    this.#_id = this.model.id
    return this.#_id
  }
  get label() {
    if(this.#_label !== undefined) return this.#_label
    this.#_label = this.model.label
    return this.#_label
  }
  get premise() {
    if(this.#_premise !== undefined) return this.#_premise
    this.#_premise = this.model.premise
    return this.#_premise
  }
}