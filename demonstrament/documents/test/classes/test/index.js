export default class Test extends EventTarget {
  #settings
  #method
  #detail
  #pass
  #boundMethod
  constructor($settings) {
    super()
    console.log($settings)
    this.#settings = $settings
    this.#boundMethod = this.method.bind(this)
  }
  get id() { return this.#settings.id }
  get name() { return this.#settings.name }
  get descript() { return this.#settings.descript }
  get type() { return this.#settings.type }
  get collectName() { return this.#settings.collectName }
  get collect() { return this.#settings.collect }
  get detail() { return this.#detail }
  set detail($detail) {
    if(this.#detail !== undefined) return
    this.#detail = $detail
  }
  get pass() { return this.#pass }
  set pass($pass) {
    if(this.#pass !== undefined) return
    this.#pass = $pass
  }
  get async() { return this.#settings.async }
  get method() {
    if(this.#method !== undefined) return this.#method
    this.#method = this.#settings.method
    return this.#method
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