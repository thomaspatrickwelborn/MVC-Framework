import TestResultsTemplate from './$template.js'
export default class View extends EventTarget {
  #settings
  #_parent
  #_element
  #_querySelectors
  #_events
  constructor($settings) {
    super()
    this.#settings = $settings
  }
  get parent() { return this.#settings.parent }
  get element() { return this.#_element }
  set element($selement) { this.#_element = $element }
  get template() {
    if(this.#_template !== undefined) return this.#_template
    this.#_template = document.createElement('template')
    return this.#_template
  }
  get templates() {
    return { this.settings.templates }
  }
  get querySelectors() {
    if(this.#_querySelectors !== undefined) return this.#_querySelectors
    const $this = this
    const querySelectors = {}
    iterateQuerySelectorTypes: 
    for(const [
      $querySelectorType, $querySelectors
    ] of Object.entries(this.#settings.querySelectors)) {
      iterateQuerySelectors: 
      for(const [
        $querySelectorName, $querySelector
      ]) {
        Object.defineProperty(querySelectors, $querySelectorName, {
          get() { return $this.parent[querySelectorName]($querySelector) }
        })
      }
    }
    this.#_querySelectors = querySelectors
    return this.#_querySelectors
  }
  get events() {
    if(this.#_events !== undefined) return this.#_events
    const $this = this
    const events = []
    iterateEvents: 
    for(const [
      $eventTargetData, $eventListener
    ] of Object.entries(this.#settings.events)) {
      const [$eventTarget, $eventType] = $eventTargetData.split(' ')
      const event = Object.defineProperties({}, {
        _target: { writable: true, enumerable: false, value: $eventTarget },
        target: { get() { return $this.querySelectors[this._eventTarget] } },
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
              this?.target.addEventListener(this.type, this.listener)
            }
            else if($enable === false) {
              this?.target.removeEventListener(this.type, this.listener)
            }
            this._enable = $enable
          },
        },
      })
    }
    this.#_events = events
    return this.#_events
  }
  enableEvents() {
    for(const $event of this.events) { $event.enable = true }
    return this
  }
  disableEvents() {
    for(const $event of this.events) { $event.enable = false }
    return this
  }
  render($model) {
    this.disableEvents()
    const innerHTML = this.templates.TestResultsTemplate($model)
    this.template.innerHTML = innerHTML
    this.element = this.template.content.childNodes
    this.parent.append(...this.element)
    this.enableEvents()
    return this
  }
}