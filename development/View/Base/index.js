import { typeOf } from '../../Coutil/index.js'
import Core from '../../Core/index.js'

const Settings = Object.freeze({
  templates: { default: () => `` },
  selectors: {},
  events: {},
})
const Options = Object.freeze({})

export default class ViewBase extends Core {
  constructor($settings = {}, $options = {}) {
    super(
      Object.assign({}, Settings, $settings),
      Object.assign({}, Options, $options),
    )
    this.templates = this.settings.templates
    this.selectors = this.settings.selectors
  }
  // Templates
  #_templates = {}
  get templates() { return this.#_templates }
  set templates($templates = Settings.templates) {
    const _templates = this.#_templates
    for(const [
      $templateName, $template
    ] of Object.entries($templates)) { _templates
      _templates[$templateName] = $template.bind(this)
    }
  }
  // Selectors
  #_selectors = {}
  #_querySelectors = {}
  get selectors() {
    return this.#_querySelectors
  }
  set selectors($selectors = Settings.selectors) {
    this.addSelectors($selectors)
  }
  // Add Selectors
  addSelectors($selectors) {
    const _selectors = this.#_selectors
    $selectors = (
      $selectors === undefined
    ) ? _selectors
      : $selectors
    for(const [
      $selectorName, $selector
    ] of Object.entries($selectors)) {
      _selectors[$selectorName] = $selector
    }
    return this
  }
  // Remove Selectors
  removeSelectors($selectors) {
    const _selectors = this.#_selectors
    $selectors = (
      $selectors === undefined
    ) ? _selectors
      : $selectors
    for(const [
      $selectorName, $selector
    ] of Object.entries($selectors)) {
      delete _selectors[selectorName]
    }
    return this
  }
  // Enable
  enable() {
    this.enableSelectors()
    this.enableEvents()
    return this
  }
  // Enable  Selectors
  enableSelectors($selectors) {
    $selectors = (
      $selectors === undefined
    ) ? this.#_selectors
      : $selectors
    const _querySelectors = this.#_querySelectors
    for(const [
      $selectorName, $selector
    ] of Object.entries($selectors)) {
      if(this.element instanceof HTMLTemplateElement) {
        _querySelectors[$selectorName] = this.element.content
        .querySelectorAll($selector)
        if(_querySelectors[$selectorName].length === 1) {
          _querySelectors[$selectorName] = _querySelectors[$selectorName][0]
        }
      } else {
        _querySelectors[$selectorName] = this.element
        .querySelectorAll($selector)
        if(_querySelectors[$selectorName].length === 1) {
          _querySelectors[$selectorName] = _querySelectors[$selectorName][0]
        }
      }
    }
    return this
  }
  // Disable
  disable() {
    this.disableSelectors()
    this.disableEvents()
    return this
  }
  // Disable Selectors
  disableSelectors($selectors) {
    $selectors = (
      $selectors === undefined
    ) ? this.#_selectors
      : $selectors
    const querySelectors = this.#_querySelectors
    for(const [
      $selectorName, $selector
    ] of Object.entries($selectors)) {
      delete querySelectors[$selectorName]
    }
    return this
  }
}