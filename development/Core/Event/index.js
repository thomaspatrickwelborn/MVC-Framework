export default class CoreEvent {
  #settings
  #boundCallback
  #_enable = false
  constructor($settings) { 
    this.#settings = $settings
  }
  get context() { return this.#settings.context }
  get type() { return this.#settings.type }
  get path() { return this.#settings.target }
  get target() {
    let target = this.context
    for(const $targetPathKey of this.path.split('.')) {
      if($targetPathKey === ':scope') break
      if(target[$targetPathKey] === undefined) return undefined
      target = target[$targetPathKey]
    }
    return target
  }
  get callback() {
    if(this.#boundCallback === undefined) {
      this.#boundCallback = this.#settings.callback.bind(this.context)
    }
    return this.#boundCallback
  }
  get enable() { return this.#_enable }
  set enable($enable) {
    if($enable === this.#_enable) return
    const eventAbility = (
      $enable === true
    ) ? 'addEventListener'
      : 'removeEventListener'
    if(this.target instanceof NodeList) {
      for(const $target of this.target) {
        $target[eventAbility](this.type, this.callback)
      }
      this.#_enable = $enable
    }
    else if(this.target instanceof EventTarget) {
      this.target[eventAbility](this.type, this.callback)
      this.#_enable = $enable
    }
    else {
      try {
        this.target[eventAbility](this.type, this.callback)
        this.#_enable = $enable
      } catch($err) { /* console.log(this.type, this.path, eventAbility) */ }
    }
  }
}