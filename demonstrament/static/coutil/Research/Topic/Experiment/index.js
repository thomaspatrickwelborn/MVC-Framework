import Hypothesis from './Hypothesis/index.js'
export default class Experiment extends EventTarget {
  #model
  #view
  #_parent
  #_template
  #_querySelectors
  #_title
  #_id
  #type = "experiment"
  #_hypotheses
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
    this.#_template.innerHTML = `<experiment>
      <h3>${this.title}</h3>
      <hypotheses></hypotheses>
    </experiment>`
    return this.#_template
  }
  get querySelectors() {
    if(this.#_querySelectors !== undefined) return this.#_querySelectors
    this.#_querySelectors = {
      experiment: this.parent.querySelector(':scope > experiment'),
      title: this.parent.querySelector(':scope > experiment > h3'),
      hypotheses: this.parent.querySelector(':scope > experiment > hypotheses'),
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
  get hypotheses() {
    if(this.#_hypotheses !== undefined) return this.#_hypotheses
    this.#_hypotheses = []
    let hypothesisIndex = 0
    for(const $hypothesis of this.#model.hypotheses) {
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