import Handler from './Handler/index.js'
const Options = Object.freeze({
  rootAlias: 'content', 
  recur: false,
})
export default class DynamicEventTarget extends EventTarget {
  constructor($root = {}, $options) {
    super()
    const { rootAlias, recur } = Object.assign(
      {}, Options, $options
    )
    this.#recur = recur
    this.#rootAlias = rootAlias
    this.type = $root
    this.#root = $root
    this.#proxy = this.#_root
    this.#proxy.assign($root)
    return this.#proxy
  }
  // Recur
  #_recur
  get #recur() { return this.#_recur }
  set #recur($recur) {
    if(this.#_recur !== undefined) return
    this.#_recur = $recur
  }
  // Type
  #_type // = 'object' // 'array'
  get type() { return this.#_type }
  set type($root) {
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
  get #root() {
    const _root = this.#_root
    const root = (
      this.type === 'array'
    ) ? []
      : {}
    for(const [
      $propKey, $propVal
    ] of Object.entries(_root)) {
      if($propVal instanceof DynamicEventTarget) {
        $propVal = $propVal[this.#rootAlias]
      }
      root[$propKey] = $propVal
    }
    return root
  }
  set #root($root) {
    if(this.#_root !== undefined) return
    this.#_root = (
      this.type === 'array'
    ) ? []
      : {}
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
      $type: this.#_type,
      $recur: this.#_recur,
      $rootAlias: this.#_rootAlias,
      $root: this.#_root,
    }
    return this.#_aliases
  }
}
