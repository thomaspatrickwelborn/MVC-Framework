import Experiment from './Experiment/index.js'
export default class Topic extends EventTarget {
  #model
  #view
  #_parent
  #_template
  #_querySelectors
  #_title
  #_id
  #type = "topic"
  #_experiments
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
    this.#_template.innerHTML = `<topic>
      <h2>${this.title}</h2>
      <experiments></experiments>
    </topic>`
    return this.#_template
  }
  get querySelectors() {
    if(this.#_querySelectors !== undefined) return this.#_querySelectors
    this.#_querySelectors = {
      topic: this.parent.querySelector(':scope > topic'),
      title: this.parent.querySelector(':scope > topic > h2'),
      experiments: this.parent.querySelector(':scope > topic > experiments'),
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
  get experiments() {
    if(this.#_experiments !== undefined) return this.#_experiments
    this.#_experiments = []
    let experimentIndex = 0
    for(const $experiment of this.#model.experiments) {
      this.#_experiments.push(
        new Experiment(
          Object.assign($experiment, { id: experimentIndex }),
          { parent: this.querySelectors.experiments },
        )
      )
      experimentIndex++
    }
    return this.#_experiments
  }
  render() {
    this.parent.appendChild(
      this.template.content
    )
    for(const $experiment of this.experiments) {
      $experiment.render()
    }
    return this
  }
}