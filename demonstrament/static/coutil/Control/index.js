export default class Control extends EventTarget {
  model
  view
  #_type
  #_parent
  #_template
  #_element
  #_querySelectors
  constructor($model = {}, $view = {}) {
    super()
    this.model = $model
    this.view = $view
    Object.defineProperty(this, 'render', {
      writable: false,
      enumerable: false,
      configurable: false, 
      value: function render() {
        this.parent
        this.element
        return this
      }
    })
  }
  get type() {
    if(this.#_type !== undefined) return this.#_type
    this.#_type = this.model.type
    return this.#_type
  }
  get parent() {
    if(this.#_parent !== undefined) return this.#_parent
    this.#_parent = this.view.parent
    return this.#_parent
  }
  get element() {
    if(this.#_element !== undefined) return this.#_element
    this.#_element = this.parent.appendChild(
      this.template.content
    )
    return this.#_element
  }
  get template() {
    if(this.#_template !== undefined) return this.#_template
    this.#_template = document.createElement('template')
    this.#_template.innerHTML = this.view.template(this)
    return this.#_template
  }
  get querySelectors() {
    if(this.#_querySelectors !== undefined) return this.#_querySelectors
    this.#_querySelectors = {}
    for(const [
      $querySelectorName, $querySelectorString
    ] of Object.entries(this.view.querySelectors)) {
      this.#_querySelectors[
        $querySelectorName
      ] = this.parent.querySelector($querySelectorString)
    }
    return this.#_querySelectors
  }

}