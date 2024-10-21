export default class CoreEvent {
  #settings
  #_boundListener
  #_enable = false
  constructor($settings) { 
    this.#settings = Object.freeze($settings)
  }
  get type() { return this.#settings.type }
  get path() { return this.#settings.path }
  get target() {
    let target = this.#context
    iterateTargetPathKeys: 
    for(const $targetPathKey of this.path.split('.')) {
      if($targetPathKey === ':scope') { break iterateTargetPathKeys }
      if(target[$targetPathKey] === undefined) { return undefined }
      target = target[$targetPathKey]
    }
    if(target instanceof EventTarget) { return target }
    return target
  }
  get listener() { return this.#settings.listener }
  get options() { return this.#settings.options }
  get enable() { return this.#_enable }
  set enable($enable) {
    if($enable === this.#_enable) { return }
    const eventAbility = (
      $enable === true
    ) ? 'addEventListener'
      : 'removeEventListener'
    if(this.target instanceof NodeList) {
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
  get #context() { return this.#settings.context }
  get #boundListener() {
    if(this.#_boundListener !== undefined) { return this.#_boundListener }
    this.#_boundListener = this.#settings.listener.bind(this.context)
    return this.#_boundListener
  }
}