import Core from '../Core/index.js'
import QuerySelector from './QuerySelector/index.js'
import Settings from './Settings/index.js'
import Options from './Options/index.js'
export default class View extends Core {
  #_parent
  #_template
  #_element
  #_querySelectors = {}
  constructor($settings = {}, $options = {}) {
    super(
      Object.assign({}, Settings, $settings),
      Object.assign({}, Options, $options),
    )
    this.addQuerySelectors(this.settings.querySelectors)
  }
  get element() { return this.#_element }
  set element($element) { this.#_element = $element}
  get parent() { return this.settings.parent }
  get template() {
    if(this.#_template !== undefined) return this.#_template
    this.#_template = document.createElement('template')
    return this.#_template
  }
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
    this.enableQuerySelectors()
    this.enableEvents()
    return this
  }
}