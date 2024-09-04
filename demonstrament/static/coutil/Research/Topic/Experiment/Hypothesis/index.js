import Test from './Test/index.js'
export default class Hypothesis extends EventTarget {
  #settings
  #options
  #_type = "hypothesis"
  constructor($settings = {}, $options = {}) {
    super()
  }
  get title() {
    if(this.#_title !== undefined) return this.#_title
    this.#_title = this.#settings.title
    return this.#_title
  }
  get tests() {
    if(this.#_tests !== undefined) return this.#_tests
    this.#_tests = []
    for(const $test of this.#settings.tests) {
      new Test()
    }
    return this.#_tests
  }
}