import * as parsel from '../../../../../../node_modules/parsel-js/dist/parsel.js'
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
  #_scopeType
  #_scope
  #_parent
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
  get scopeType() {
    if(this.#_scopeType !== undefined) return this.#_scopeType
    this.#_scopeType = this.settings.scope
    return this.#_scopeType
  }
  get parent() {
    if(this.#_parent !== undefined) return this.#_parent
    this.#_parent = this.settings.parent
    return this.#_parent
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
    this.parent.append(...this.#children.values())
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
  query($queryMethod, $queryString) {
    // Scope Type: Template
    const query = []
    let queryTokens = parsel.tokenize($queryString)
    let queryString
    // Orient Query Tokens To Scope
    if(queryTokens[0].content !== ':scope') {
      queryString = [':scope', $queryString].join(' ')
      queryTokens = parsel.tokenize(queryString)
    }
    else {
      queryString = parsel.stringify(queryTokens)
      queryTokens = parsel.tokenize(queryString)
    }
    // Scope
    // Query Scope
    const scope = queryTokens[0]
    // Query Scope Combinator (Descendent/Child)
    const scopeCombinator = queryTokens[1]
    // Query Scope String 
    const scopeQueryString = parsel.stringify(queryTokens.slice(2))
    // Query Scope Tokens 
    const scopeQueryTokens = parsel.tokenize(scopeQueryString)
    const scopeQueryParse = parsel.parse(scopeQueryString)
    // Iterate Children
    iterateChildren: 
    for(const $child of this.#children.values()) {
      // Complex
      if(scopeQueryParse.type === 'complex') {
        const firstChildQueryString = parsel.stringify(scopeQueryParse.left)
        const anterChildQueryString = [
          ':scope', scopeQueryParse.combinator, parsel.stringify(scopeQueryParse.right)
        ].join('')
        const childMatches = $child.matches(firstChildQueryString)
        const childQuery = $child[$queryMethod](anterChildQueryString)
        if(childMatches && childQuery) {
          if(childQuery instanceof NodeList) { query.push(...childQuery) }
          else { query.push(childQuery) }
        }
        if(scopeCombinator !== '>') {
          const descendentQuery = $child[$queryMethod](scopeQueryString)
          if(descendentQuery) {
            if(descendentQuery instanceof NodeList) { query.push(...descendentQuery) }
            else { query.push(descendentQuery) }
          }
        }
      }
      else {
        const childMatches = $child.matches(scopeQueryString)
        if(childMatches) {
          query.push($child)
        }
        if(scopeCombinator !== '>') {
          const descendentQuery = $child[$queryMethod](scopeQueryString)
          if(descendentQuery) {
            if(descendentQuery instanceof NodeList) { query.push(...descendentQuery) }
            else { query.push(descendentQuery) }
          }
        }
      }
      if($queryMethod === 'querySelector' && query.length > 1) { break iterateChildren }
    }
    if($queryMethod === 'querySelector' && query.length) { return query[0] }
    else if($queryMethod === 'querySelectorAll') { return query }
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