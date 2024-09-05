export default class Argument extends EventTarget {
  #settings
  #options
  #_id
  #_claim
  #_premise
  #_inference
  constructor($settings = {}) {
    super()
    this.#settings = $settings
    this.#options = $options
  }
  get id() {
    if(this.#_id !== undefined) return this.#_id
    this.#_id = this.#settings.id
    return this.#_id
  }
  get claim() {
    if(this.#_claim !== undefined) return this.#_claim
    this.#_claim = this.#settings.claim
    return this.#_claim
  }
  get premise() {
    if(this.#_premise !== undefined) return this.#_premise
    this.#_premise = this.#settings.premise
    return this.#_premise
  }
  get inference() {
    if(this.#_inference !== undefined) return this.#_inference
    this.#_inference = this.#settings.inference
    return this.#_inference
  }
}