import Handler from './Handler/index.js'
export default class DynamicEventTarget extends EventTarget {
  constructor($root = {}, $rootAlias) {
    super()
    this.#type = $root
    this.#rootAlias = $rootAlias
    this.#root = $root
    this.#proxy = this
    Object.freeze(this)
    return this.#proxy
  }
  // Type
  #_type // = 'object' // 'array'
  get #type() { return this.#_type }
  set #type($root) {
    if(this.#_type !== undefined) return
    this.#_type = (
      Array.isArray($root)
    ) ? 'array'
      : 'object'
  }
  // Root Alias
  #_rootAlias
  get #rootAlias() { return this.#_rootAlias }
  set #rootAlias($rootAlias) {
    if(this.#_rootAlias !== undefined) return
    this.#_rootAlias = (
      typeof $rootAlias === 'string' &&
      $rootAlias.length > 0
    ) ? $rootAlias
      : 'content'
  }
  // Root
  #_root
  get #root() { return this.#_root }
  set #root($root) {
    if(this.#_root !== undefined) return
    this.#_root = (
      this.#type === 'array'
    ) ? []
      : {}
    Object.assign(this.#_root, $root)
  }
  // Proxy
  #_proxy
  get #proxy() { return this.#_proxy }
  set #proxy($target) {
    if(this.#_proxy !== undefined) return
    this.#_proxy = new Proxy($target, this.#handler)
  }
  // Handler
  #_handler
  get #handler() {
    if(this.#_handler !== undefined) return this.#_handler
    this.#_handler = new Handler(this.#aliases)
    return this.#_handler
  }
  // Aliases
  #_aliases
  get #aliases() {
    if(this.#_aliases !== undefined) return this.#_aliases
    this.#_aliases = {
      $eventTarget: this,
      $rootAlias: this.#_rootAlias,
      $root: this.#_root,
      $proxy: this.#_proxy,
    }
    return this.#_aliases
  }
}
