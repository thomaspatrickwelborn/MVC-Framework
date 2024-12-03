export default class Verification extends EventTarget {
  #settings
  #_message
  #_pass
  constructor($settings) {
    super()
    this.#settings = $settings
  }
  get type() { return this.#settings.type }
  get context() { return this.#settings.context }
  get key() { return this.#settings.key }
  get value() { return this.#settings.value }
  get message() {
    if(this.#_message !== undefined) return this.#_message
    if(
      this.pass !== undefined &&
      this.#_message === undefined
    ) {
      this.#_message = this.#settings.messages[String(this.pass)](this)
    }
    return this.#_message
  }
  get pass() { return this.#_pass }
  set pass($pass) {
    if(this.#_pass === undefined) {
      this.#_pass = $pass
    }
  }
}