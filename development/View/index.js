import Core from '../Core/index.js'
import QuerySelector from './QuerySelector/index.js'
import Settings from './Settings/index.js'
import Options from './Options/index.js'
export default class View extends Core {
  #_templates
  #_scopeType
  #_scope
  #_parent
  #_element
  #_children
  // #_template
  #_querySelectors = {}
  constructor($settings = {}, $options = {}) {
    super(
      Object.assign({}, Settings, $settings),
      Object.assign({}, Options, $options),
    )
    this.addQuerySelectors(this.settings.querySelectors)
  }
  get templates() {
    if(this.#_templates !== undefined) return this.#_templates
    this.#_templates = this.settings.templates
    return this.#_templates
  }
  get scopeType() {
    if(this.#_scopeType !== undefined) return this.#_scopeType
    this.#_scopeType = this.settings.scope
    return this.#_scopeType
  }
  get scope() {
    if(this.#_scope !== undefined) return this.#_scope
    const scopeType = this.scopeType
    if(scopeType === 'template') { this.#_scope = this.#element }
    else if(scopeType === 'parent') { this.#_scope = this.parent }
    return this.#_scope
  }
  get parent() {
    if(this.#_parent !== undefined) return this.#_parent
    this.#_parent = this.settings.parent
    return this.#_parent
  }
  get #element() {
    if(this.#_element !== undefined) { return this.#_element }
    this.#_element = document.createElement('element')
    return this.#_element
  }
  set #element($templateString) {
    this.disableEvents()
    this.disableQuerySelectors()
    this.#_querySelectors = {}
    this.#element.innerHTML = $templateString
    this.#children = this.#element.children
    this.querySelectors
    this.enableQuerySelectors()
    this.enableEvents()
    this.parent.append(...this.#children)
  }
  get #children() {
    if(this.#_children !== undefined) return this.#_children
    this.#_children = new Map()
    return this.#_children
  }
  set #children($children) {
    const children = this.#children
    children.forEach(($child, $childIndex) => $child?.parentElement.removeChild($child))
    children.clear()
    Array.from($children).forEach(($child, $childIndex) => {
      children.set($childIndex, $child)
    })
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
    this.#element = this.templates[$template]($model)
    return this
  }
}