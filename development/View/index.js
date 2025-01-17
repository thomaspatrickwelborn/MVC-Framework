import * as parsel from '../../node_modules/parsel-js/dist/parsel.js'
import Core from '../Core/index.js'
import QuerySelector from './QuerySelector/index.js'
import Query from './Query/index.js'
import Settings from './Settings/index.js'
import Options from './Options/index.js'
export default class View extends Core {
  #templates
  #scope
  #parentElement
  #_template
  #children
  #querySelectors = {}
  constructor($settings = {}, $options = {}) {
    super(
      Object.assign({}, Settings, $settings),
      Object.assign({}, Options, $options),
    )
    this.addQuerySelectors(this.settings.querySelectors)
    const { enableQuerySelectors, enableEvents } = this.options
    if(enableQuerySelectors) this.enableQuerySelectors()
    if(enableEvents) this.enableEvents()
  }
  get templates() {
    if(this.#templates !== undefined) return this.#templates
    this.#templates = this.settings.templates
    return this.#templates
  }
  get scope() {
    if(this.#scope !== undefined) return this.#scope
    this.#scope = this.settings.scope
    return this.#scope
  }
  get parentElement() {
    if(this.#parentElement !== undefined) return this.#parentElement
    this.#parentElement = this.settings.parentElement
    return this.#parentElement
  }
  get #template() {
    if(this.#_template !== undefined) { return this.#_template }
    this.#_template = document.createElement('template')
    return this.#_template
  }
  set #template($templateString) {
    this.disableEvents()
    this.disableQuerySelectors()
    this.#template.innerHTML = $templateString
    this.children = this.#template.content.children
    this.parentElement.append(...this.children.values())
    this.enableQuerySelectors()
    this.enableEvents()
  }
  get children() {
    if(this.#children !== undefined) return this.#children
    this.#children = new Map()
    return this.#children
  }
  set children($children) {
    const children = this.children
    children.forEach(($child, $childIndex) => $child?.parentElement.removeChild($child))
    children.clear()
    Array.from($children).forEach(($child, $childIndex) => {
      children.set($childIndex, $child)
    })
  }
  get querySelectors() { return this.#querySelectors }
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
      : { children: Array.from(this.parentElement.children) }
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