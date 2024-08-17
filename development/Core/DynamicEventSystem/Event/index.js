import { typeOf, propFromPropPath } from '../../../Coutil/index.js'
export default class Event {
  constructor($settings) { 
    this.settings = $settings
  }
  #_settings = {}
  get settings() { return this.#_settings }
  set settings($settings) {
    const _settings = this.#_settings
    const {
      context, type, target, callback, enable
    } = $settings
    _settings.context = context
    this.context = context
    _settings.type = type
    this.type = type
    _settings.target = target
    this.target = target
    _settings.callback = callback
    this.callback = callback
    _settings.enable = enable
    this.enable = enable

  }
  #_context
  get context() { return this.#_context }
  set context($context) { this.#_context = $context }
  #_type
  get type() { return this.#_type }
  set type($type) { this.#_type = $type }
  #_path = ''
  get path() { return this.#_path }
  set path($path) { this.#_path = $path }
  get target() {
    let target = this.context
    for(const $targetPathKey of this.path.split('.')) {
      if($targetPathKey === ':scope') break
      if(target[$targetPathKey] === undefined) return undefined
      target = target[$targetPathKey]
    }
    return target
  }
  set target($target) { this.path = $target }
  #_callback
  get callback() {
    return this.#_callback
  }
  set callback($callback) {
    this.#_callback = $callback.bind(this.context)
  }
  #_enable = false
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
        this.#_enable = $enable
      }
    } else if(this.target instanceof EventTarget) {
      this.target[eventAbility](this.type, this.callback)
      this.#_enable = $enable
    } else {
      try {
        this.target[eventAbility](this.type, this.callback)
        this.#_enable = $enable
      } catch($err) { /* console.log(this.type, this.path, eventAbility) */ }
    }
  }
}