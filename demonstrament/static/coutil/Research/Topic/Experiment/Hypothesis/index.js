import Control from '/coutil/Control/index.js'
import Test from './Test/index.js'
export default class Hypothesis extends Control {
  #_tests
  constructor($model = {}, $view = {}) {
    super($model, Object.assign($view, {
      template: ($content) => `
        <hypothesis>
          <h4>${$content.title}</h4>
          <tests></tests>
        </hypothesis>
      `,
      querySelectors: {
        hypothesis: ':scope > hypothesis',
        title: ':scope > hypothesis > h4',
        tests: ':scope > hypothesis > tests',
      },
    }))
    this.render()
    this.tests
  }
  get tests() {
    if(this.#_tests !== undefined) return this.#_tests
    this.#_tests = []
    let testIndex = 0
    for(const $test of this.model.tests) {
      this.#_tests.push(
        new Test(
          Object.assign($test, Config['test'], { id: testIndex }),
          { parent: this.querySelectors.tests },
        )
      )
      testIndex++
    }
    return this.#_tests
  }
}