import * as parsel from '../../../../../../node_modules/parsel-js/dist/parsel.js'
import Query from './query.js'
const Combinators = {
  descendant: " ",
  child: ">",
  nextSibling: "+",
  subsequentSibling: "~",

}
export default class View extends EventTarget {
  settings = {
    scope: 'template', // 'parent'
    templates: { default: ($model) => `` },
  }
  #_templates
  #_scope
  #_parentElement
  #_template
  #_children
  #_querySelectors
  #_events
  constructor($settings) {
    super()
    Object.assign(this.settings, $settings)
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
  get parentElement() {
    if(this.#_parentElement !== undefined) return this.#_parentElement
    this.#_parentElement = this.settings.parentElement
    return this.#_parentElement
  }
  get #template() {
    if(this.#_template !== undefined) return this.#_template
    this.#_template = document.createElement('template')
    return this.#_template
  }
  set #template($templateString) {
    this.disable()
    this.#template.innerHTML = $templateString
    this.#children = [...this.#template.content.children]
    this.enable()
    this.parentElement.append(...this.#children.values())
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
  get querySelectors() {
    if(this.#_querySelectors !== undefined) return this.#_querySelectors
    let $this = this
    const querySelectors = {}
    iterateQuerySelectorTypes: 
    for(const [
      $querySelectorType, $querySelectors
    ] of Object.entries(this.settings.querySelectors)) {
      iterateQuerySelectors: 
      for(const [
        $querySelectorName, $querySelector
      ] of Object.entries($querySelectors)) {
        Object.defineProperty(querySelectors, $querySelectorName, {
          get() { return $this[$querySelectorType]($querySelector) }
        })
      }
    }
    this.#_querySelectors = querySelectors
    return this.#_querySelectors
  }
  get events() {
    if(this.#_events !== undefined) return this.#_events
    let $this = this
    const events = []
    iterateEvents: 
    for(const [
      $eventTargetData, $eventListener
    ] of Object.entries(this.settings.events)) {
      const [$eventTarget, $eventType] = $eventTargetData.split(' ')
      const event = Object.defineProperties({}, {
        _target: { writable: true, enumerable: false, value: $eventTarget },
        target: { get() { return $this.querySelectors[this._target] } },
        type: { value: $eventType },
        _listener: { writable: true, enumerable: false, value: undefined },
        listener: { get() {
          if(this._listener !== undefined) return this._listener
          this._listener = $eventListener.bind($this)
          return this._listener
        } },
        _enable: { writable: true, enumerable: false, value: false },
        enable: {
          get() { return this._enable },
          set($enable) {
            if(this._enable === $enable) { return }
            if($enable === true) {
              this.target?.addEventListener(this.type, this.listener)
            }
            else if($enable === false) {
              this.target?.removeEventListener(this.type, this.listener)
            }
            this._enable = $enable
          },
        },
      })
      events.push(event)
    }
    this.#_events = events
    return this.#_events
  }
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
      ? { children: Array.from(this.#children.values()) }
      : { children: Array.from(this.parentElement.children) }
    return Query(queryElement, $queryMethod, $queryString)
  }
  enableQuerySelectors() {
    this.querySelectors
    return this
  }
  disableQuerySelectors() {
    this.#_querySelectors = undefined
    return this
  }
  enableEvents() {
    for(const $event of this.events) { $event.enable = true }
    return this
  }
  disableEvents() {
    for(const $event of this.events) { $event.enable = false }
    return this
  }
  enable() { return this.enableQuerySelectors().enableEvents() }
  disable() { return this.disableEvents().disableQuerySelectors() }
  render() {
    const $arguments = [...arguments]
    if($arguments.length === 0) { this.disable().enable() }
    else if($arguments.length === 2) {
      const $model = $arguments[0]
      const $template = $arguments[1]
      this.#template = this.templates[$template]($model)
    }
    this.dispatchEvent(new CustomEvent('render', { detail: { view: this } }))
    return this
  }
}