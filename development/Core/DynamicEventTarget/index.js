import { typeOf } from '../../Coutil/index.js'
import Handler from './Handler/index.js'
const Options = Object.freeze({
  rootAlias: 'content',
  objectAssignMerge: true,
  objectDefinePropertyDescriptorTree: true,
  objectDefinePropertyDescriptorValueMerge: true,
  objectFreezeRecurse: true,
  objectSealRecurse: true,
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
    return this.#proxy
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
      this.#options.$parent !== undefined
    ) ? this.#options.$parent
      : null
    return this.#_parent
  }
  get basename() {
    if(this.#_basename !== undefined)  return this.#_basename
    this.#_basename = (
      this.#options.$basename !== undefined
    ) ? this.#options.$basename
      : null
    return this.#_basename
  }
  get path() {
    if(this.#_path !== undefined)  return this.#_path
    this.#_path = (
      this.#options.$path !== undefined
    ) ? this.#options.$path
      : null
    return this.#_path
  }
  // Root Alias
  get #rootAlias() {
    if(this.#_rootAlias !== undefined) return this.#_rootAlias
    this.#_rootAlias = (
      typeof this.#options.$rootAlias === 'string' &&
      this.#options.$rootAlias.length > 0
    ) ? this.#options.$rootAlias
      : Options.rootAlias
    return this.#_rootAlias
  }
  // Root
  get #root() {
    if(this.#_root !== undefined) return this.#_root
    this.#_root = (
      this.type === 'object'
    ) ? {...this.#settings}
      : (
      this.type === 'array'
    ) ? [...this.#settings]
    //   : (
    //   this.type === 'map'
    // ) ? new Map()
      : {...this.#settings}
    return this.#_root
  }
  // Proxy
  get #proxy() {
    if(this.#_proxy !== undefined) return this.#_proxy
    this.#_proxy = new Proxy(this.#root, this.#handler)
    if(this.type === 'object') {
      this.#_proxy.assign(this.#root)
    } else
    if(this.type === 'array') {
      this.#_proxy.assign(this.#root)
    } /* else
    if(this.type === 'map') {
      for(const [
        $mapKey, $mapVal
      ] of $root) {
        //
      }
    } */
    return this.#_proxy
  }
  // Handler
  get #handler() {
    if(this.#_handler !== undefined) return this.#_handler
    const {
      objectAssignMerge, 
      objectDefinePropertyDescriptorTree,
      objectDefinePropertyDescriptorValueMerge,
      objectFreezeRecurse,
      objectSealRecurse,
    } = this.#options
    this.#_handler = new Handler(this.#aliases, {
      traps: {
        object: {
          assign: {
            merge: objectAssignMerge,
          },
          defineProperties: {
            descriptorValueMerge: objectDefinePropertyDescriptorValueMerge,
            descriptorTree: objectDefinePropertyDescriptorTree,
          },
          defineProperty: {
            descriptorValueMerge: objectDefinePropertyDescriptorValueMerge,
            descriptorTree: objectDefinePropertyDescriptorTree,
          },
          freeze: {
            recurse: objectFreezeRecurse,
          },
          seal: {
            recurse: objectSealRecurse,
          },
        }
      }
    })
    return this.#_handler
  }
  // Aliases
  get #aliases() {
    if(this.#_aliases !== undefined) return this.#_aliases
    this.#_aliases = {
      $type: this.type,
      $eventTarget: this,
      $rootAlias: this.#rootAlias,
      $root: this.#root,
      $path: this.path,
      $basename: this.basename,
      $parent: this.parent,
    }
    return this.#_aliases
  }
  parse() {
    let parsement = (
      this.type === 'object'
    ) ? {}
      : (
      this.type === 'array'
    ) ? []
    /*: (
      this.type === 'map'
    ) ? new Map()*/
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
    return parsement
  }
  inspect() {
    return JSON.stringify(this.parse(), null, 2)
  }
}
