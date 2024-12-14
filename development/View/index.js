import Core from '../Core/index.js'
import QuerySelector from './QuerySelector/index.js'
import Settings from './Settings/index.js'
import Options from './Options/index.js'
export default class View extends Core {
  #_parent
  #_element
  #_children = []
  #_template
  #_querySelectors = {}
  constructor($settings = {}, $options = {}) {
    super(
      Object.assign({}, Settings, $settings),
      Object.assign({}, Options, $options),
    )
    this.addQuerySelectors(this.settings.querySelectors)
  }
  get parent() { return this.settings.parent }
  get element() {
    if(this.#_element !== undefined) { return this.#_element }
    this.#_element = document.createElement('element')
    return this.#_element
  }
  set element($documentFragment) {
    this.disableEvents()
    this.disableQuerySelectors()
    this.#_querySelectors = undefined
    this.children = $documentFragment.children
    this.element.replaceChildren(...this.children)
    this.querySelectors
    this.parent.append(...this.children)
    this.enableQuerySelectors()
    this.enableEvents()
  }
  get children() { return this.#_children }
  set children($children) {
    const children = this.#_children
    children.forEach(($child) => $child?.parent.removeChild($child))
    children.length = 0
    children.push($children)
  }
  get template() {
    if(this.#_template !== undefined) return this.#_template
    this.#_template = document.createElement('template')
    return this.#_template
  }
  get templates() { return this.settings.templates }
  get querySelectors() { return this.#_querySelectors }
  get qs() { return this.querySelectors }
  addQuerySelectors($queryMethods) {
    if($queryMethods === undefined) return this
    const { querySelectors } = this.settings
    for(const [$queryMethod, $selectors] of Object.entries($queryMethods)) {
      for(const [$selectorName, $selector] of Object.entries($selectors)) {
        querySelectors[$queryMethod] = querySelectors[$queryMethod] || {}
        querySelectors[$queryMethod][$selectorName] = new QuerySelector({
          context: this,
          name: $selectorName,
          method: $queryMethod,
          selector: $selector,
          enable: false,
        })
      }
    }
    return this
  }
  removeQuerySelectors($queryMethods) {
    $queryMethods = $queryMethods || this.settings.querySelectors
    for(const [
      $queryMethod, $selectors
    ] of Object.entries($queryMethods)) {
      for(const [
        $selectorName, $selector
      ] of Object.entries($selectors)) {
        if(this.settings.querySelectors[$queryMethod] !== undefined) {
          delete this.settings.querySelectors[$queryMethod][$selectorName]
        }
      }
    }
    return this
  }
  enableQuerySelectors($queryMethods) {
    $queryMethods = $queryMethods || this.settings.querySelectors
    const $this = this 
    for(const $selectors of Object.values($queryMethods)) {
      for(const $selector of Object.values($selectors)) {
        $selector.enable = true
      }
    }
    return this
  }
  disableQuerySelectors($queryMethods) {
    $queryMethods = $queryMethods || this.settings.querySelectors
    for(const $selectors of Object.values($queryMethods)) {
      for(const $selector of Object.values($selectors)) {
        $selector.enable = false
      }
    }
    return this
  }
  render($model = {}, $template = 'default') {
    this.template.innerHTML = this.templates[$template]($model)
    this.element = this.template.content
    return this
  }
}