import { match } from '../../../node_modules/path-to-regexp/dist/index.js'
export default class Route extends EventTarget {
  #settings
  #_enable
  #_active
  #_match
  constructor($settings = {}) {
    super()
    this.#settings = $settings
  }
  get name() { return this.#settings.name }
  get basename() { return this.#settings.basename }
  get enable() {
    if(this.#_enable !== undefined) return this.#_enable
    this.#_enable = this.#settings.enable
    return this.#_enable
  }
  set enable($enable) {
    if(this.#_enable !== $enable) this.#_enable = $enable
  }
  get active() {
    if(this.#_active !== undefined) return this.#_active
    this.#_active = this.#settings.active
    return this.#_active
  }
  set active($active) {
    if(this.#_active !== $active) this.#_active = $active
  }
  get match() {
    if(this.#_match !== undefined) return this.#_match
    this.#_match = match(this.basename)
    return this.#_match
  }
  pathname() { return this.settings.window.pathname }
  hash() { return this.settings.window.hash }
  search() { return this.settings.window.search }
}