import Core from '../Core/index.js'
const Settings = {
  templates: { default: () => `` },
  querySelectors: {},
  events: {},
}
const Options = {}
export default class View extends Core {
  #_parent
  #_element
  #_template
  #_querySelectors
  #_isRendered = false
  constructor($settings = {}, $options = {}) {
    super(
      Object.assign({}, Settings, $settings),
      Object.assign({}, Options, $options),
    )
  }
  get parent() { return this.settings.parent }
  get template() {
    if(this.#_template !== undefined) return this.#_template
    this.#_template = document.createElement('template')
    return this.#_template
  }
  get querySelectors() {
    if(this.#_querySelectors !== undefined) return this.#_querySelectors
    const $this = this
    this.#_querySelectors = {}
    for(const [
      $querySelectorMethod, $querySelectors
    ] of Object.entries(this.settings.querySelectors)) {
      for(const [
        $querySelectorName, $querySelector
      ] of Object.entries($querySelectors)) {
        Object.defineProperty(this.#_querySelectors, $querySelectorName, {
          get() {
            return $this.parent[$querySelectorMethod]($querySelector)
          }
        })
      }
    }
    return this.#_querySelectors
  }
  autoinsert() {
    try {
      const { target, position } = this.settings.autoinsert
      target.insertAdjacentElement(position, this.parent)
    } catch($err) {}
    return this
  }
  autoremove() {
    try {
      this.parent.parentElement.removeChild(this.parent)
    } catch($err) {}
    return this
  }
  render($model, $template = 'default') {
    this.disableEvents()
    this.template.innerHTML = this.settings.templates[$template]($model)
    this.parent.replaceChildren()
    this.parent.appendChild(this.template.content)
    if(this.options.enableEvents === true) { this.enableEvents() }
    return this
  }
}