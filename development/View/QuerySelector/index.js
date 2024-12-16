export default class QuerySelector {
  #settings
  #_enable
  constructor($settings) {
    this.#settings = $settings
  }
  get context() { return this.#settings.context }
  get method() { return this.#settings.method }
  get name() { return this.#settings.name }
  get selector() { return this.#settings.selector }
  get enable() { return this.#_enable }
  set enable($enable) {
    // Unable
    if($enable === this.#_enable) return
    // Enable
    if($enable === true) {
      const { context, name, method, selector } = this
      console.log(context.querySelectors)
      const $this = this
      Object.defineProperty(context.querySelectors, name, {
        enumerable: true,
        configurable: true,
        // get() { return context.scope[method](selector) }
        value: context.scope[method](selector)
      })
    }
    // Disable
    else if($enable === false) {
      delete this.context.querySelectors[this.name]
    }
    this.#_enable = $enable
  }
}