import Control from '/coutil/Control/index.js'
export default class Precondition extends Control {
  length = 0
  #_statement
  constructor($model = {}, $view = {}) {
    super($model, Object.assign($view, {
      template: ($content) => `
        <precondition>
          <label>${$content.label}</label>
          <statement>${$content.statement}</statement>
        </precondition>
      `,
      querySelectors: {},
    }))
    this.render()
  }
  get statement() {
    if(this.#_statement !== undefined) return this.#_statement
    this.#_statement = this.model.statement
    return this.#_statement
  }
}