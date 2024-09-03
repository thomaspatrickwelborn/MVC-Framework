import { typeOf } from '../../Coutil/index.js'
import Handler from './Handler/index.js'
const Options = Object.freeze({
  rootAlias: 'content',
  object: {
    assign: {
      merge: true, 
    },
    defineProperties: {
      descriptorValueMerge: true,
      descriptorTree: true,
    },
    defineProperty: {
      descriptorValueMerge: true,
      descriptorTree: true,
    },
    freeze: {
      recurse: true,
    },
    seal: {
      recurse: true,
    },
    set: {
      merge: true
    },
  }
})
export default class DynamicEventTarget extends EventTarget {
  #settings
  #options
  #_type // 'object' // 'array' // 'map'
  #_rootAlias
  #_root
  #_parent
  #_basename
  #_path
  #_proxy
  #_handler
  #_aliases
  constructor($settings = {}, $options = {}) {
    super()
    this.#settings = $settings
    this.#options = Object.assign(
      {}, Options, $options
    )
    return this.proxy
  }
  // Type
  get type() {
    if(this.#_type !== undefined) return this.#_type
    this.#_type = typeOf(this.#settings)
    return this.#_type
  }
  get parent() {
    if(this.#_parent !== undefined)  return this.#_parent
    this.#_parent = (
      this.#options.parent !== undefined
    ) ? this.#options.parent
      : null
    return this.#_parent
  }
  get basename() {
    if(this.#_basename !== undefined)  return this.#_basename
    this.#_basename = (
      this.#options.basename !== undefined
    ) ? this.#options.basename
      : null
    return this.#_basename
  }
  get path() {
    if(this.#_path !== undefined)  return this.#_path
    this.#_path = (
      this.#options.path !== undefined
    ) ? this.#options.path
      : null
    return this.#_path
  }
  // Root Alias
  get #rootAlias() {
    if(this.#_rootAlias !== undefined) return this.#_rootAlias
    this.#_rootAlias = (
      typeof this.#options.rootAlias === 'string' &&
      this.#options.rootAlias.length > 0
    ) ? this.#options.rootAlias
      : Options.rootAlias
    return this.#_rootAlias
  }
  // Root
  get #root() {
    if(this.#_root !== undefined) return this.#_root
    this.#_root = (
      typeOf(this.#settings) === 'object'
    ) ? {}
      : (
      typeOf(this.#settings) === 'array'
    ) ? []
      : {}
    return this.#_root
  }
  // Proxy
  get proxy() {
    if(this.#_proxy !== undefined) return this.#_proxy
    this.#_proxy = new Proxy(this.#root, this.#handler)
    this.#handler.proxy = this.proxy
    if(this.type === 'object') {
      this.#_proxy.assign(this.#settings)
    } else
    if(this.type === 'array') {
      this.#_proxy.assign(this.#settings)
    }
    return this.#_proxy
  }
  // Handler
  get #handler() {
    if(this.#_handler !== undefined) return this.#_handler
    this.#_handler = new Handler(this.#aliases, {
      traps: {
        object: this.#options.object
      }
    })
    return this.#_handler
  }
  // Aliases
  get #aliases() {
    if(this.#_aliases !== undefined) return this.#_aliases
    this.#_aliases = Object.defineProperties({}, {
      eventTarget: { value: this },
      basename: { value: this.basename },
      path: { value: this.path },
      parent: { value: this.parent },
      rootAlias: { value: this.#rootAlias },
      root: { value: this.#root },
      type: { value: this.type },
    })
    return this.#_aliases
  }
  parse($settings = {
    type: 'object', // 'json',
  }) {
    let parsement = (
      this.type === 'object'
    ) ? {}
      : (
      this.type === 'array'
    ) ? []
      : {}
    if(this.type !== 'map') {
      for(const [$key, $val] of Object.entries(this.#root)) {
        if(
          $val !== null &&
          typeof $val === 'object'
        ) {
          parsement[$key] = $val.parse()
        } else(
          parsement[$key] = $val
        )
      }
    }
    if(
      $settings.type === 'object' || 
      $settings.type === 'Object'
    ) {
      return parsement
    } else if(
      $settings.type === 'json' || 
      $settings.type === 'JSON' 
    ) {
      return JSON.stringify(parsement, null, 2)
    }
    return undefined
  }
}
