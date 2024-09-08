import Control from '/coutil/Control/index.js'
export default class PostCondition extends Control {
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
  get premise() {
    if(this.#_premise !== undefined) return this.#_premise
    this.#_premise = this.model.premise
    return this.#_premise
  }
}