import Core from '../Core/index.js'
const Settings = {
  templates: { default: () => `` },
  querySelectors: {},
  events: {},
}
const Options = { enableQuerySelectors: true }
export default class View extends Core {
  #_parent
  #_template
  #_querySelectors = {}
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
  get querySelectors() { return this.#_querySelectors }
  get qs() { return this.querySelectors }
  addQuerySelectors($querySelectorMethods) {
    if($querySelectorMethods === undefined) return this
    for(const [
      $querySelectorMethod, $querySelectors
    ] of Object.entries($querySelectorMethods)) {
      for(const [
        $querySelectorName, $querySelector
      ] of Object.entries($querySelectors)) {
        this.settings.querySelectors[$querySelectorMethod] = this.settings.querySelectors[$querySelectorMethod] || {}
        this.settings.querySelectors[$querySelectorMethod][$querySelectorName] = $querySelector
      }
    }
    return this
  }
  removeQuerySelectors($querySelectorMethods) {
    $querySelectorMethods = $querySelectorMethods || this.settings.querySelectors
    for(const [
      $querySelectorMethod, $querySelectors
    ] of Object.entries($querySelectorMethods)) {
      for(const [
        $querySelectorName, $querySelector
      ] of Object.entries($querySelectors)) {
        if(this.settings.querySelectors[$querySelectorMethod] !== undefined) {
          delete this.settings.querySelectors[$querySelectorMethod][$querySelectorName]
        }
      }
    }
    return this
  }
  enableQuerySelectors($querySelectorMethods) {
    $querySelectorMethods = $querySelectorMethods || this.settings.querySelectors
    const $this = this
    for(const [
      $querySelectorMethod, $querySelectors
    ] of Object.entries($querySelectorMethods)) {
      for(const [
        $querySelectorName, $querySelector
      ] of Object.entries($querySelectors)) {
        Object.defineProperty(this.querySelectors, $querySelectorName, {
          enumerable: true,
          configurable: true,
          get() { return $this.parent[$querySelectorMethod]($querySelector) }
        })
      }
    }
    return this
  }
  disableQuerySelectors($querySelectorMethods) {
    $querySelectorMethods = $querySelectorMethods || this.settings.querySelectors
    for(const [
      $querySelectorMethod, $querySelectors
    ] of Object.entries($querySelectorMethods)) {
      for(const [
        $querySelectorName, $querySelector
      ] of Object.entries($querySelectors)) {
        delete this.querySelectors[$querySelectorName]
      }
    }
    return this
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
    this.disableQuerySelectors()
    const preelement = this.element
    this.template.innerHTML = this.settings.templates[$template]($model)
    this.element = this.template.content.childNodes
    if(preelement?.length) {
      for(const $preelement of preelement) { $preelement.remove() }
    }
    this.parent.append(...this.element)
    if(this.options.enableQuerySelectors === true) { this.enableQuerySelectors() }
    if(this.options.enableEvents === true) { this.enableEvents() }
    return this
  }
}