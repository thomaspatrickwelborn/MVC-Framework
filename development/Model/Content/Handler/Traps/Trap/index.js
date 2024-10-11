export default class Trap {
  #methods
  #content
  #options
  constructor($methods, $content, $options = {}) {
    this.#methods = $methods
    this.#content = $content
    this.#options = $options
    for(let [
      $methodName, $createPropertyMethod
    ] of Object.entries(this.#methods)) {
      const methodOptions = this.#options[$methodName] || {}
      Object.defineProperty(this, $methodName, {
        value: $createPropertyMethod(this.#content, methodOptions)
      })
    }
  }
}