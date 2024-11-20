import { match } from '../../../node_modules/path-to-regexp/dist/index.js'
export default class Route extends EventTarget {
  #_settings
  #_enable
  #_active
  #_match
  constructor($settings = {}) {
    super()
    this.#settings = $settings
    console.log(this)
  }
  get #settings() { return this.#_settings }
  set #settings($settings) {
    this.#_settings = $settings
    for(const [$settingKey, $settingVal] of Object.entries($settings)) {
      Object.defineProperty(this, $settingKey, { value: $settingVal })
    }
  }
  get pathname() { return this.#settings.pathname }
  get enable() {
    if(this.#_enable !== undefined) return this.#_enable
    if(this.#settings.enable !== undefined) {
      this.#_enable = this.#settings.enable
    }
    else { this.#_enable = true }
    return this.#_enable
  }
  set enable($enable) {
    if(this.#_enable !== $enable) this.#_enable = $enable
  }
  get active() {
    if(this.#_active !== undefined) return this.#_active
    if(this.#settings.active === undefined) { this.#_active = false }
    return this.#_active
  }
  set active($active) {
    if(this.#_active !== $active) this.#_active = $active
  }
  get match() {
    if(this.#_match !== undefined) return this.#_match
    this.#_match = match(this.pathname)
    return this.#_match
  }
}