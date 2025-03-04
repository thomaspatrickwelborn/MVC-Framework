export default class QuerySelector {
  #settings
  #enable
  constructor($settings) {
    this.#settings = $settings
  }
  get context() { return this.#settings.context }
  get method() { return this.#settings.method }
  get name() { return this.#settings.name }
  get selector() { return this.#settings.selector }
  get enable() { return this.#enable }
  set enable($enable) {
    if($enable === this.#enable) return
    if($enable === true) {
      const { context, name, method, selector } = this
      const $this = this
      Object.defineProperty(context.querySelectors, name, {
        configurable: true, enumerable: true, 
        get() { return context[method](selector) }
      })
    }
    else if($enable === false) {
      delete this.context.querySelectors[this.name]
    }
    this.#enable = $enable
  }
}