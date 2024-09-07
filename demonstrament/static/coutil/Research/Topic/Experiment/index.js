import Control from '/coutil/Control/index.js'
import Hypothesis from './Hypothesis/index.js'
export default class Experiment extends Control {
  #_title
  #_id
  #type = "experiment"
  #_hypotheses
  constructor($model = {}, $view = {}) {
    super($model, Object.assign($view, {
      template: ($content) => `
        <experiment>
          <h3>${$content.title}</h3>
          <hypotheses></hypotheses>
        </experiment>
      `, 
      querySelectors: {
        experiment: ':scope > experiment',
        title: ':scope > experiment > h3',
        hypotheses: ':scope > experiment > hypotheses',
      },
    }))
    this.render()
    this.hypotheses
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
  get hypotheses() {
    if(this.#_hypotheses !== undefined) return this.#_hypotheses
    this.#_hypotheses = []
    let hypothesisIndex = 0
    for(const $hypothesis of this.model.hypotheses) {
      this.#_hypotheses.push(
        new Hypothesis(
          Object.assign($hypothesis, { id: hypothesisIndex }),
          { parent: this.querySelectors.hypotheses },
        )
      )
      hypothesisIndex++
    }
    return this.#_hypotheses
  }
  render() {
    this.parent.appendChild(
      this.template.content
    )
    for(const $hypothesis of this.hypotheses) {
      $hypothesis.render()
    }
    return this
  }
}