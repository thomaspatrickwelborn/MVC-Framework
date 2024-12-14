export default class View extends EventTarget {
  settings
  #_parent
  #_element
  #_children = []
  #_template
  #_querySelectors
  #_events
  constructor($settings) {
    super()
    this.settings = $settings
  }
  get parent() { return this.settings.parent }
  get element() {
    if(this.#_element !== undefined) { return this.#_element }
    this.#_element = document.createElement('element')
    return this.#_element
  }
  set element($documentFragment) {
    this.disableEvents()
    this.children = $documentFragment.childNodes
    this.#_querySelectors = undefined
    this.element.replaceChildren(...this.children)
    this.enableEvents()
    this.parent.append(...this.children)
  }
  get children() { return this.#_children }
  set children($children) {
    const children = this.#_children
    children.forEach(($child) => $child.parent.removeChild($child))
    children.length = 0
    children.push(...$children)
  }
  get template() {
    if(this.#_template !== undefined) return this.#_template
    this.#_template = document.createElement('template')
    return this.#_template
  }
  get templates() {
    return this.settings.templates
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
          value: this.element[$querySelectorType]($querySelector)
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
              this?.target.addEventListener(this.type, this.listener)
            }
            else if($enable === false) {
              this?.target.removeEventListener(this.type, this.listener)
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
  enableEvents() {
    for(const $event of this.events) { $event.enable = true }
    return this
  }
  disableEvents() {
    for(const $event of this.events) { $event.enable = false }
    return this
  }
  render($model = {}, $template = 'default') {
    this.template.innerHTML = this.templates[$template]($model)
    this.element = this.template.content
    return this
  }
}