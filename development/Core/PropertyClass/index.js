import Handler from './Handler/index.js'
export default class PropertyClass {
  #settings
  #core
  #target
  #handler
  #proxy
  constructor($settings, $core) {
    this.#settings = $settings
    this.core = $core
    return this.proxy
  }
  get core() { return this.#core }
  set core($core) {
    if(this.#core !== undefined) return
    this.#core = $core
    return this.#core
  }
  get target() {
    if(this.#target !== undefined) { return this.#target }
    this.#target = {}
    return this.#target
  }
  get handler() {
    if(this.#handler !== undefined) { return this.#handler }
    this.#handler = new Handler(this)
    return this.#handler
  }
  get proxy() {
    if(this.#proxy !== undefined) { return this.#proxy }
    this.#proxy = new Proxy(this.target, this.handler)
    return this.#proxy
  }
  get Class() { return this.#settings.Class }
  get ClassInstanceValidator() { return this.#settings.ClassInstanceValidator }
  get ClassInstantiator() { return this.#settings.ClassInstantiator }
  get ClassDeinstantiator() { return this.#settings.ClassDeinstantiator }
  get Names() { return this.#settings.Names }
  get Events() { return this.#settings.Events }
}