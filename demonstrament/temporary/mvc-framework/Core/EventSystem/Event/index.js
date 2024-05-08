import { typeOf, propFromPropPath } from '../../../Utils/index.js'
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
    // Context | EventTarget
    _settings.context = context
    this.context = context
    // Type | String
    _settings.type = type
    this.type = type
    // Target | String (Contextual Target Path)
    _settings.target = target
    this.target = target
    // Callback | String (Contextual Callback Path) || Function
    _settings.callback = callback
    this.callback = callback
    // Enabled | Boolean
    _settings.enable = enable
    this.enable = enable

  }
  // Context
  #_context
  get context() { return this.#_context }
  set context($context) { this.#_context = $context }
  // Type
  #_type
  get type() { return this.#_type }
  set type($type) { this.#_type = $type }
  // Target
  #_target
  get target() {
    let target = this.context
    for(const $targetPathKey of this.#_target.split('.')) {
      if($targetPathKey === ':scope') break
      if(target === undefined) break
      target = target[$targetPathKey]
    }
    return target
  }
  set target($target) { this.#_target = $target }
  // Callback
  #_callback
  get callback() {
    if(typeof this.#_callback === 'string') {
      let callback = this.context
      for(const $callbackPathKey of this.#_callback.split('.')) {
        if($callbackPathKey === ':scope') break
        if(callback === undefined) break
        callback = callback[$callbackPathKey]
      }
      return callback
    } else if(typeof this.#_callback === 'function') {
      return this.#_callback
    }
  }
  set callback($callback) { this.#_callback = $callback }
  // Enabled
  #_enable = false
  get enable() { return this.#_enable }
  set enable($enable) {
    if($enable === this.#_enable) return
    const eventAbility = (
      $enable === true
    ) ? 'addEventListener'
      : 'removeEventListener'
    try {
      this.target[eventAbility](this.type, this.callback)
    } catch($err) { /* console.log($err) */ }
    this.#_enable = $enable
  }
}