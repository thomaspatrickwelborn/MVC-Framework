import { typeOf } from '/mvc-framework/Utils/index.js'
import Handler from './Handler/index.js'
const Options = Object.freeze({
  rootAlias: 'content', 
})
export default class DynamicEventTarget extends EventTarget {
  constructor($root = {}, $options) {
    super()
    const { rootAlias } = Object.assign(
      {}, Options, $options
    )
    this.#rootAlias = rootAlias
    this.type = $root
    this.#root = $root
    this.#proxy = $root
    return this.#proxy
  }
  // Type
  #_type // 'object' // 'array' // 'map'
  get type() { return this.#_type }
  set type($root) {
    if(this.#_type !== undefined) return
    this.#_type = typeOf($root)
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
      this.type === 'object'
    ) ? new Object()
      : (
      this.type === 'array'
    ) ? new Array()
      : (
      this.type === 'map'
    ) ? new Map()
      : new Object()
  }
  // Proxy
  #_proxy
  get #proxy() { return this.#_proxy }
  set #proxy($root) {
    if(this.#_proxy !== undefined) return
    this.#_proxy = new Proxy(this.#root, this.#handler)
    if(this.type === 'object') {
      this.#_proxy.assign($root)
    } else
    if(this.type === 'array') {
      this.#_proxy.assign(Object.entries($root))
    } else
    if(this.type === 'map') {
      for(const [
        $mapKey, $mapVal
      ] of $root) {
        console.log($mapKey, $mapVal)
      }
    }
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
      $rootAlias: this.#_rootAlias,
      $root: this.#_root,
    }
    return this.#_aliases
  }
}
