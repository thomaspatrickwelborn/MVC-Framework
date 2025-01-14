import Handler from
export default class PropertyClass extends {
  #settings
  constructor($settings) {
    super()
    this.#settings = $settings
  }
  get target() {}
  get handler() {}
  get proxy() {
    if(this.#_proxy !== undefined) { return this.#_proxy }
    this.#_proxy = new Proxy(this.target, this.handler)
    return this.#_proxy
  }
}