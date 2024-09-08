import PostCondition from './PostCondition/index.js'
import Control from '/coutil/Control/index.js'
export default class Conclusion extends Control {
  #_summary
  #_postconditions
  constructor($model = {}, $view = {}) {
    super($model, Object.assign($view, {
      template: ($content) => {
        return `
          <conclusion>
            <h6>${$content.title}</h6>
            <arguments></arguments>
            <postconditions></postconditions>
          </conclusion>
        `
      },
      querySelectors: {
        conclusion: ':scope > conclusion',
        postconditions: ':scope > conclusion > postconditions',
        arguments: ':scope > conclusion > arguments',
      },
    }))
    this.render()
    // console.log(...arguments)
    this.arguments
    this.postconditions
  }
  get summary() {
    if(this.#_summary !== undefined) return this.#_summary
    this.#_summary = this.model.arguments
    .map(($argument) => $argument.inference)
    .includes(false)
    return this.#_summary
  }
  get postconditions() {
    if(this.#_postconditions !== undefined) return this.#_postconditions
    this.#_postconditions = []
    let postconditionIndex = 0
    for(const $postcondition of this.model.postconditions) {
      this.#_postconditions.push(
        new PostCondition(
          Object.assign($postcondition, Config['postcondition'], { id: postconditionIndex }),
          { parent: this.querySelectors.postconditions },
        )
      )
      postconditionIndex++
    }
    return this.#_postconditions
  }
}