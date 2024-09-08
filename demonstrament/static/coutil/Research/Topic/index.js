import Control from '/coutil/Control/index.js'
import Experiment from './Experiment/index.js'
export default class Topic extends Control {
  #_experiments
  constructor($model = {}, $view = {}) {
    super($model, Object.assign($view, {
      template: ($content) => `
        <topic>
          <h2>${$content.title}</h2>
          <experiments></experiments>
        </topic>
      `,
      querySelectors: {
        topic: ':scope > topic',
        title: ':scope > topic > h2',
        experiments: ':scope > topic > experiments',
      }
    }))
    this.render()
    this.experiments
  }
  get experiments() {
    if(this.#_experiments !== undefined) return this.#_experiments
    this.#_experiments = []
    let experimentIndex = 0
    for(const $experiment of this.model.experiments) {
      this.#_experiments.push(
        new Experiment(
          Object.assign($experiment, Config['experiment'], { id: experimentIndex }),
          { parent: this.querySelectors.experiments },
        )
      )
      experimentIndex++
    }
    return this.#_experiments
  }
}