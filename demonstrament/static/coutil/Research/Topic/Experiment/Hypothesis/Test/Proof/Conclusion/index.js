export default class Conclusion extends EventTarget {
  #model
  #view
  #_parent
  #_template
  #_id
  #_label
  #_summary
  #_hiddenAssumptions
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
    this.#_template.innerHTML = `<proof>
      <h6>${this.title}</h6>
      <description>${this.description}</description>
      <preconditions></preconditions>
      <arguments></arguments>
      <conclusions></conclusions>
    </proof>`
    return this.#_template
  }
  get id() {
    if(this.#_id !== undefined) return this.#_id
    this.#_id = this.#model.id
    return this.#_id
  }
  get label() {
    if(this.#_label !== undefined) return this.#_label
    this.#_label = this.#model.label
    return this.#_label
  }
  get summary() {
    if(this.#_summary !== undefined) return this.#_summary
    this.#_summary = this.#model.arguments
    .map(($argument) => $argument.inference)
    .includes(false)
    return this.#_summary
  }
  get hiddenAssumptions() {
    if(this.#_hiddenAssumptions !== undefined) return this.#_hiddenAssumptions
    this.#_hiddenAssumptions = []
    let hiddenAssumptionIndex = 0
    for(const $hiddenAssumption of this.#model.hiddenAssumptions) {
      this.#_hiddenAssumptions.push(
        new HiddenAssumption(Object.assign())
      )
      hiddenAssumptionIndex++
    }

    return this.#_hiddenAssumptions
  }
}