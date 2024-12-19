import * as parsel from '../../node_modules/parsel-js/dist/parsel.js'
import Core from '../Core/index.js'
import QuerySelector from './QuerySelector/index.js'
import Query from './Query/index.js'
import Settings from './Settings/index.js'
import Options from './Options/index.js'
export default class View extends Core {
  #_templates
  #_scope
  #_parent
  #_template
  #_children
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
  get scope() {
    if(this.#_scope !== undefined) return this.#_scope
    this.#_scope = this.settings.scope
    return this.#_scope
  }
  get parent() {
    if(this.#_parent !== undefined) return this.#_parent
    this.#_parent = this.settings.parent
    return this.#_parent
  }
  get #template() {
    if(this.#_template !== undefined) { return this.#_template }
    this.#_template = document.createElement('template')
    return this.#_template
  }
  set #template($templateString) {
    this.disableEvents()
    this.disableQuerySelectors()
    // this.#_querySelectors = {}
    this.#template.innerHTML = $templateString
    this.children = this.#template.content.children
    // this.querySelectors
    this.enableQuerySelectors()
    this.enableEvents()
    this.parent.append(...this.children.values())
  }
  get children() {
    if(this.#_children !== undefined) return this.#_children
    this.#_children = new Map()
    return this.#_children
  }
  set children($children) {
    const children = this.children
    children.forEach(($child, $childIndex) => $child?.parentElement.removeChild($child))
    children.clear()
    Array.from($children).forEach(($child, $childIndex) => {
      children.set($childIndex, $child)
    })
  }
  get querySelectors() { return this.#_querySelectors }
  get qs() { return this.querySelectors }
  querySelector($queryString, $queryScope) {
    const query = this.#query('querySelector', $queryString, $queryScope)
    return query[0] || null
  }
  querySelectorAll($queryString, $queryScope) {
    const query = this.#query('querySelectorAll', $queryString, $queryScope)
    return query
  }
  #query($queryMethod, $queryString) {
    const queryElement = (this.scope === 'template')
      ? { children: Array.from(this.children.values()) }
      : { children: Array.from(this.parent.children) }
    return Query(queryElement, $queryMethod, $queryString)
  }
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
    this.#template = this.templates[$template]($model)
    return this
  }
}