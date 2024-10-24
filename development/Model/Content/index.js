import { typeOf, recursiveAssign } from '../../Coutil/index.js'
import Handler from './Handler/index.js'
import Schema from '../Schema/index.js'
import Options from './Options/index.js'
export default class Content extends EventTarget {
  #_settings
  #_options
  #_schema
  #_type
  #_root
  #_parent
  #_basename
  #_path
  #_proxy
  #_handler
  constructor($settings = {}, $schema = null, $options = {}) {
    super()
    this.settings = $settings
    this.options = $options
    this.schema = $schema
    return this.proxy
  }
  get settings() { return this.#_settings }
  set settings($settings) {
    if(this.#_settings !== undefined) return
    this.#_settings = $settings
    return this.#_settings
  }
  get options() { return this.#_options }
  set options($options) {
    if(this.#_options !== undefined) return
    this.#_options = recursiveAssign({}, Options, $options)
    return this.#_options
  }
  get schema() { return this.#_schema }
  set schema($schema) {
    if(this.#_schema !== undefined)  { return }
    if(!$schema) { this.#_schema = null }
    else if($schema instanceof Schema) { this.#_schema = $schema }
    else if(typeof $schema === 'object') {
      if(Array.isArray($schema)) { new Schema(...arguments) }
      else { new Schema($schema) }
    }
  }
  get classToString() { return Content.toString() }
  // Object
  get object() { return this.parse({ type: 'object' }) }
  // String
  get string() { return this.parse({ type: 'string' }) }
  // Type
  get type() {
    if(this.#_type !== undefined) return this.#_type
    this.#_type = typeOf(this.settings)
    return this.#_type
  }
  get typedObjectLiteral() {
    if(this.type === 'object') { return {} }
    else if(this.type === 'array') { return [] }
    else { return {} }
  }
  get parent() {
    if(this.#_parent !== undefined)  return this.#_parent
    this.#_parent = (this.options.parent)
      ? this.options.parent
      : null
    return this.#_parent
  }
  get basename() {
    if(this.#_basename !== undefined) { return this.#_basename }
    if(this.path) { this.#_basename = this.path.split('.').pop() }
    else { this.#_basename = null }
    return this.#_basename
  }
  get path() {
    if(this.#_path !== undefined)  return this.#_path
    this.#_path = (this.options.path)
      ? String(this.options.path)
      : null
    return this.#_path
  }
  // Root
  get root() {
    if(this.#_root !== undefined) return this.#_root
    this.#_root = this.typedObjectLiteral
    return this.#_root
  }
  // Proxy
  get proxy() {
    if(this.#_proxy !== undefined) return this.#_proxy
    this.#_proxy = new Proxy(this.root, this.#handler)
    this.#_proxy.set(this.settings)
    return this.#_proxy
  }
  // Handler
  get #handler() {
    if(this.#_handler !== undefined) return this.#_handler
    this.#_handler = new Handler(this, {
      traps: this.options.traps,
    })
    return this.#_handler
  }
  // Parse
  parse($settings = {
    type: 'object',
  }) {
    let parsement
    if(this.type === 'object') { parsement = {} }
    if(this.type === 'array') { parsement = [] }
    parsement = Object.entries(
      Object.getOwnPropertyDescriptors(this.proxy)
    ).reduce(($parsement, [
      $propertyDescriptorName, $propertyDescriptor
    ]) => {
      if(typeof $propertyDescriptor.value === 'object') {
        $parsement[$propertyDescriptorName] = $propertyDescriptor.value?.parse($settings)
      } else {
        $parsement[$propertyDescriptorName] = $propertyDescriptor.value
      }
      return $parsement
    }, parsement)
    if(
      $settings.type === 'object' || 
      $settings.type === 'Object'
    ) return parsement
    else if(
      $settings.type === 'string' || 
      $settings.type === 'String'
    ) return JSON.stringify(parsement, null, 2)
    return undefined
  }
}