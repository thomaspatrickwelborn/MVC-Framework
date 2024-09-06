import Test from './Test/index.js'
export default class Hypothesis extends EventTarget {
  #model
  #view
  #_parent
  #_template
  #_querySelectors
  #_title
  #_id
  #type = "hypothesis"
  #_tests
  constructor($model = {}, $view = {}) {
    super()
    this.#model = $model
    this.#view = $view
    this.render()
  }
  get parent() {
    if(this.#_parent !== undefined) return this.#_parent
    this.#_parent = this.#view.parent
    return this.#_parent
  }
  get template() {
    if(this.#_template !== undefined) return this.#_template
    this.#_template = document.createElement('template')
    this.#_template.innerHTML = `<hypothesis>
      <h4>${this.title}</h4>
      <tests></tests>
    </hypothesis>`
    return this.#_template
  }
  get querySelectors() {
    if(this.#_querySelectors !== undefined) return this.#_querySelectors
    this.#_querySelectors = {
      hypothesis: this.parent.querySelector(':scope > hypothesis'),
      title: this.parent.querySelector(':scope > hypothesis > h4'),
      tests: this.parent.querySelector(':scope > hypothesis > tests'),
    }
    return this.#_querySelectors
  }
  get id() {
    if(this.#_id !== undefined) return this.#_id
    this.#_id = this.#model.id
    return this.#_id
  }
  get title() {
    if(this.#_title !== undefined) return this.#_title
    this.#_title = this.#model.title
    return this.#_title
  }
  get tests() {
    if(this.#_tests !== undefined) return this.#_tests
    this.#_tests = []
    let testIndex = 0
    for(const $test of this.#model.tests) {
      this.#_tests.push(
        new Test(
          Object.assign($test, { id: testIndex }),
          { parent: this.querySelectors.tests },
        )
      )
      testIndex++
    }
    return this.#_tests
  }
  render() {
    this.parent.appendChild(
      this.template.content
    )
    for(const $test of this.tests) {
      $test.render()
    }
    return this
  }
}