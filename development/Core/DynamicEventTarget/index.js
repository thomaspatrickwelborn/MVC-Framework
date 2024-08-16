import { typeOf } from '../../Utils/index.js'
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
  // Root Alias
  get #rootAlias() {
    if(this.#_rootAlias !== undefined) return this.#_rootAlias
    this.#_rootAlias = (
      typeof this.#options.rootAlias === 'string' &&
      this.#options.rootAlias.length > 0
    ) ? this.#options.rootAlias
      : 'content'
    return this.#_rootAlias
  }
  // Root
  get #root() {
    if(this.#_root !== undefined) return this.#_root
    this.#_root = (
      this.type === 'object'
    ) ? new Object(this.#settings)
      : (
      this.type === 'array'
    ) ? new Array(...this.#settings)
    //   : (
    //   this.type === 'map'
    // ) ? new Map()
      : new Object(this.#settings)
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
        console.log($mapKey, $mapVal)
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
    }
    return this.#_aliases
  }
  parse() {
    let parsement
    if(this.type === 'object') {
      parsement = {}
      for(const [
        $propertyKey, $propertyVal
      ] of Object.entries(this.#proxy)) {
        if($propertyVal && typeof $propertyVal === 'object') {
          parsement[$propertyKey] = $propertyVal.parse()
        } else {
          parsement[$propertyKey] = $propertyVal
        }
      }
    } else
    if(this.type === 'array') {
      parsement = []
      let propertyIndex = 0
      for(const $property of this.#proxy) {
        if($property && typeof $property === 'object') {
          parsement[propertyIndex] = $property.parse()
        } else {
          parsement[propertyIndex] = $property
        }
        propertyIndex++
      }
    } /* else
    if(this.type === 'map') {

    } */
    return parsement
  }
  inspect() {
    return JSON.stringify(this.parse(), null, 2)
  }
}
