import { match } from 'path-to-regexp'
export default class Route extends EventTarget {
  #_settings
  #enable
  #active
  #match
  constructor($settings = {}) {
    super()
    this.#settings = $settings
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
    if(this.#enable !== undefined) return this.#enable
    if(this.#settings.enable !== undefined) {
      this.#enable = this.#settings.enable
    }
    else { this.#enable = true }
    return this.#enable
  }
  set enable($enable) {
    if(this.#enable !== $enable) this.#enable = $enable
  }
  get active() {
    if(this.#active !== undefined) return this.#active
    if(this.#settings.active === undefined) { this.#active = false }
    return this.#active
  }
  set active($active) {
    if(this.#active !== $active) this.#active = $active
  }
  get match() {
    if(this.#match !== undefined) return this.#match
    this.#match = match(this.pathname)
    return this.#match
  }
}