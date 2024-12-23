export default class Test extends EventTarget {
  #settings
  #_method
  #_boundMethod
  #_detail
  #_pass
  constructor($settings) {
    super()
    this.#settings = $settings
  }
  get id() { return this.#settings.id }
  get name() { return this.#settings.name }
  get type() { return this.#settings.type }
  get collectName() { return this.#settings.collectName }
  get collect() { return this.#settings.collect }
  get detail() { return this.#_detail }
  set detail($detail) {
    if(this.#_detail !== undefined) return
    this.#_detail = $detail
  }
  get pass() { return this.#_pass }
  set pass($pass) {
    if(this.#_pass !== undefined) return
    this.#_pass = $pass
  }
  get method() {
    if(this.#_method !== undefined) return this.#_method
    this.#_method = this.#settings.method
    return this.#_method
  }
  get #boundMethod() {
    if(this.#_boundMethod !== undefined) return this.#_boundMethod
    this.#_boundMethod = this.method.bind(this)
    return this.#_boundMethod
  }
  execute() {
    if(this.pass !== undefined) return this
    this.#boundMethod()
    return this 
  }
  async asyncExecute() {
    if(this.pass !== undefined) return this
    await this.#boundMethod()
    return this
  }
}