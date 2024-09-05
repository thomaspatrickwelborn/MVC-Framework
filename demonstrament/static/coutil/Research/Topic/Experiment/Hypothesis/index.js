import Test from './Test/index.js'
export default class Hypothesis extends EventTarget {
  #settings
  #_id
  #type = "hypothesis"
  #_title
  #_tests
  constructor($settings = {}) {
    super()
    this.#settings = $settings
  }
  get id() {
    if(this.#_id !== undefined) return this.#_id
    this.#_id = this.#settings.id
    return this.#_id
  }
  get title() {
    if(this.#_title !== undefined) return this.#_title
    this.#_title = this.#settings.title
    return this.#_title
  }
  get tests() {
    if(this.#_tests !== undefined) return this.#_tests
    this.#_tests = []
    let testIndex = 0
    for(const $test of this.#settings.tests) {
      this.#_tests.push(
        new Test(
          Object.assign($test, { id: testIndex })
        )
      )
      testIndex++
    }
    return this.#_tests
  }
}