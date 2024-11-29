import Valence from "../Valence/index.js"
export default class Verification extends Valence {
  #_message
  constructor() {
    super(...arguments)
  }
  get message() {
    if(this.#_message !== undefined) return this.#_message
    if(
      this.valid !== undefined &&
      this.#_message === undefined
    ) {
      this.#_message = this.settings.messages[this.#_valid](this)
    }
    return this.#_message
  }
}