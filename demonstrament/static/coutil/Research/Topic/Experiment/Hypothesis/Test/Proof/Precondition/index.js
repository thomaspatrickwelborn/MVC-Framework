import Control from '/coutil/Control/index.js'
export default class Precondition extends Control {
  length = 0
  #_id
  #_label
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
  get statement() {
    if(this.#_statement !== undefined) return this.#_statement
    this.#_statement = this.model.statement
    return this.#_statement
  }
}