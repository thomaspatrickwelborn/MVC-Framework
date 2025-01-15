import Content from '../../Model/Content/index.js'
export default class CoreEvent {
  #settings
  #_boundListener
  #_enable = false
  constructor($settings) { 
    this.#settings = $settings
  }
  get type() { return this.#settings.type }
  get path() { return this.#settings.path }
  get target() {
    let target = this.#context
    const pathKeys = this.path.split('.')
    let pathKeysIndex = 0
    iterateTargetPathKeys: 
    while(pathKeysIndex < pathKeys.length) {
      const pathKey = pathKeys[pathKeysIndex]
      if(pathKeysIndex === 0 && pathKey === ':scope') {
        break iterateTargetPathKeys
      }
      if(target.classToString === Content.toString()) {
        target = target.get(pathKey)
      }
      else {
        target = target[pathKey]
      }
      if(target === undefined) { break iterateTargetPathKeys }
      pathKeysIndex++
    }
    return target
  }
  get listener() { return this.#settings.listener }
  get options() { return this.#settings.options }
  get enable() { return this.#_enable }
  set enable($enable) {
    if(
      $enable === this.#_enable ||
      this.target === undefined
    ) { return }
    const eventAbility = (
      $enable === true
    ) ? this.#propertyClassEvents.Assign
      : this.#propertyClassEvents.Deassign
    if(
      this.target instanceof NodeList ||
      Array.isArray(this.target)
    ) {
      for(const $target of this.target) {
        $target[eventAbility](this.type, this.#boundListener, this.options)
      }
      this.#_enable = $enable
    }
    else if(this.target instanceof EventTarget) {
      this.target[eventAbility](this.type, this.#boundListener, this.options)
      this.#_enable = $enable
    }
    else {
      try {
        this.target[eventAbility](this.type, this.#boundListener, this.options)
        this.#_enable = $enable
      } catch($err) {}
    }
  }
  get #propertyClassEvents() { return this.#settings.propertyClassEvents }
  get #context() { return this.#settings.context }
  get #boundListener() {
    if(this.#_boundListener !== undefined) { return this.#_boundListener }
    this.#_boundListener = this.#settings.listener.bind(this.#context)
    return this.#_boundListener
  }
}