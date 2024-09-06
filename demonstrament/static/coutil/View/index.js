export default class Control extends EventTarget {
  #model
  #view
  #_parent
  #_template
  #_querySelectors
  #type = "research"
  constructor($model = {}, $view = {}) {
    super(...arguments)
    this.#model = $model
    this.#view = $view
  }
  get parent() {
    if(this.#_parent !== undefined) return this.#_parent
    this.#_parent = this.#view.parent
    return this.#_parent
  }
  get querySelectors() {
    if(this.#_querySelectors !== undefined) return this.#_querySelectors
    this.#_querySelectors = {
      research: this.parent.querySelector(':scope > research'),
      title: this.parent.querySelector(':scope > research > h1'),
      topics: this.parent.querySelector(':scope > research > topics'),
    }
    return this.#_querySelectors
  }
}