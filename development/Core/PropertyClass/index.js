import Handler from './Handler/index.js'
export default class PropertyClass {
  #settings
  #_core
  #_target
  #_handler
  #_proxy
  constructor($settings, $core) {
    this.#settings = $settings
    this.core = $core
    return this.proxy
  }
  get core() { return this.#_core }
  set core($core) {
    if(this.#_core !== undefined) return
    this.#_core = $core
    return this.#_core
  }
  get target() {
    if(this.#_target !== undefined) { return this.#_target }
    this.#_target = {}
    return this.#_target
  }
  get handler() {
    if(this.#_handler !== undefined) { return this.#_handler }
    this.#_handler = new Handler(this)
    return this.#_handler
  }
  get proxy() {
    if(this.#_proxy !== undefined) { return this.#_proxy }
    this.#_proxy = new Proxy(this.target, this.handler)
    return this.#_proxy
  }
  get Class() { return this.#settings.Class }
  get ClassInstantiator() { return this.#settings.ClassInstantiator }
  get ClassDeinstantiator() { return this.#settings.ClassDeinstantiator }
  get Names() { return this.#settings.Names }
  get Events() { return this.#settings.Events }
}