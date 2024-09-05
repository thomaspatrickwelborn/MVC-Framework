export default class Conclusion extends EventTarget {
  #settings
  #options
  #_id
  #_label
  #_hiddenAssumptions
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
  get label() {
    if(this.#_label !== undefined) return this.#_label
    this.#_label = this.#settings.label
    return this.#_label
  }
  get hiddenAssumptions() {
    if(this.#_hiddenAssumptions !== undefined) return this.#_hiddenAssumptions
    this.#_hiddenAssumptions = []
    let hiddenAssumptionIndex = 0
    for(const $hiddenAssumption of this.#settings.hiddenAssumptions) {
      this.#_hiddenAssumptions.push(
        new HiddenAssumption(Object.assign())
      )
      hiddenAssumptionIndex++
    }

    return this.#_hiddenAssumptions
  }
}