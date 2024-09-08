import Control from '/coutil/Control/index.js'
import Precondition from './Precondition/index.js'
import Argument from './Argument/index.js'
import Conclusion from './Conclusion/index.js'
export default class Proof extends Control {
  #_preconditions
  #_arguments
  #_conclusions
  constructor($model = {}, $view = {}) {
    super($model, Object.assign($view, {
      template: ($content) => `
        <proof>
          <h6>${$content.title}</h6>
          <description>${$content.description}</description>
          <preconditions></preconditions>
          <arguments></arguments>
          <conclusions></conclusions>
        </proof>
        `,
        querySelectors: {
          proof: ':scope > proof',
          title: ':scope > proof > h6',
          preconditions: ':scope > proof > preconditions',
          arguments: ':scope > proof > arguments',
          conclusions: ':scope > proof > conclusions',
        }
    }))
    this.render()
    this.preconditions
    this.arguments
    this.conclusions
  }
  get preconditions() {
    if(this.#_preconditions !== undefined) return this.#_preconditions
    this.#_preconditions = []
    let preconditionIndex = 0
    for(const $precondition of this.model.preconditions) {
      this.#_preconditions.push(
        new Precondition(
          Object.assign($precondition, Config['precondition'], { id: preconditionIndex }),
          { parent: this.querySelectors.preconditions },
        )
      )
      preconditionIndex++
    }
    return this.#_preconditions
  }
  get arguments() {
    if(this.#_arguments !== undefined) return this.#_arguments
    this.#_arguments = []
    let argumentIndex = 0
    for(const $argument of this.model.arguments) {
      this.#_arguments.push(
        new Argument(
          Object.assign($argument, Config['argument'], { id: argumentIndex }),
          { parent: this.querySelectors.arguments },
        )
      )
      argumentIndex++
    }
    return this.#_arguments
  }
  get conclusions() {
    if(this.#_conclusions !== undefined) return this.#_conclusions
    this.#_conclusions = []
    let conclusionIndex = 0
    for(const $conclusion of this.model.conclusions) {
      const conclusion = new Conclusion(
        Object.assign($conclusion, Config['conclusion'], {
          id: conclusionIndex,
          arguments: this.arguments,
        }),
        { parent: this.querySelectors.conclusions },
      )
      this.#_conclusions.push(conclusion)
      conclusionIndex++
    }
    return this.#_conclusions
  }
}