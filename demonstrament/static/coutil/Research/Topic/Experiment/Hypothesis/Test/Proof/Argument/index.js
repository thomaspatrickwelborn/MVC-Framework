export default class Argument extends EventTarget {
  #settings
  #options
  #_claim
  #_premise
  #_inference
  constructor($settings = {}, $options = {}) {
    super()
    this.#settings = $settings
    this.#options = $options
  }
  get claim() {
    if(this.#_claim !== undefined) return this.#_claim
    return this.#_claim
  }
  get premise() {
    if(this.#_premise !== undefined) return this.#_premise
    return this.#_premise
  }
  get inference() {
    if(this.#_inference !== undefined) return this.#_inference
    return this.#_inference
  }
}