import { typeOf, recursiveAssign, typedObjectLiteral } from '../../Coutil/index.js'
import Handler from './Handler/index.js'
import Schema from '../Schema/index.js'
import Options from './Options/index.js'
import ContentEvent from './Events/Content/index.js'
export default class Content extends EventTarget {
  #_properties
  #_options
  #_schema
  #_type
  #_source
  #_parent
  #_key
  #_path
  #_proxy
  #_handler
  constructor($properties = {}, $schema = null, $options = {}) {
    super()
    this.#properties = $properties
    this.options = $options
    this.schema = $schema
    if(
      this.schema !== null && 
      this.schema?.type !== this.type
    ) { return undefined }
    else {
      return this.proxy
    }
  }
  get #properties() { return this.#_properties }
  set #properties($properties) {
    if(this.#_properties !== undefined) return
    this.#_properties = $properties
    return this.#_properties
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
  get object() { return this.#parse({ type: 'object' }) }
  get string() { return this.#parse({ type: 'string' }) }
  get type() {
    if(this.#_type !== undefined) return this.#_type
    this.#_type = typeOf(this.#properties)
    return this.#_type
  }
  get parent() {
    if(this.#_parent !== undefined)  return this.#_parent
    this.#_parent = (this.options.parent)
      ? this.options.parent
      : null
    return this.#_parent
  }
  get root() {
    let root = this
    iterateParents: 
    while(root) {
      if(!root.parent) { break iterateParents }
      root = root.parent
    }
    return root
  }
  get key() {
    if(this.#_key !== undefined) { return this.#_key }
    if(this.path) { this.#_key = this.path.split('.').pop() }
    else { this.#_key = null }
    return this.#_key
  }
  get path() {
    if(this.#_path !== undefined)  return this.#_path
    this.#_path = (this.options.path)
      ? String(this.options.path)
      : null
    return this.#_path
  }
  get source() {
    if(this.#_source !== undefined) return this.#_source
    this.#_source = typedObjectLiteral(this.#properties)
    return this.#_source
  }
  get proxy() {
    if(this.#_proxy !== undefined) return this.#_proxy
    const { proxyAssignmentMethod } = this.options
    this.#_proxy = new Proxy(this.source, this.#handler)
    this.#_proxy[proxyAssignmentMethod](this.#properties)
    return this.#_proxy
  }
  get #handler() {
    if(this.#_handler !== undefined) return this.#_handler
    this.#_handler = new Handler(this, {
      traps: this.options.traps,
    })
    return this.#_handler
  }
  #parse($settings = {
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
      if($propertyDescriptor.value?.classToString === Content.toString()) {
        $parsement[$propertyDescriptorName] = $propertyDescriptor.value.object
      }
      else {
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