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
      if(target[$targetPathKey] === undefined) break
        target = target[$targetPathKey]
    }
    return target
  }
  set target($target) { this.#_target = $target }
  // Callback
  #_callback
  get callback() {
    return this.#_callback
  }
  set callback($callback) {
    this.#_callback = $callback.bind(this.context)
  }
  // Enabled
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
        try {
          $target[eventAbility](this.type, this.callback)
        } catch($err) { console.log($err) }
      }
    } else {
      try {
        this.target[eventAbility](this.type, this.callback)
      } catch($err) { console.log($err) }
    }
    this.#_enable = $enable
  }
}