import { typedObjectLiteral, typeOf } from '../../coutil/index.js'
import Handler from './handler/index.js'
import Schema from '../schema/index.js'
import Options from './options/index.js'
import ContentEvent from './events/content/index.js'
export default class Content extends EventTarget {
  #_properties
  #options
  #schema
  #type
  #target
  #parent
  #key
  #path
  #proxy
  #_handler
  constructor($properties = {}, $schema = null, $options = {}) {
    super()
    this.#properties = $properties
    this.#options = Options($options)
    this.schema = $schema
    const { proxyAssignmentMethod } = this.options
    const { proxy } = this
    if(['set', 'assign'].includes(proxyAssignmentMethod)) {
      proxy[proxyAssignmentMethod](this.#properties)
    }
    else {
      proxy[this.#options.proxyAssignmentMethod](this.#properties)
    }
    return proxy
  }
  get #properties() { return this.#_properties }
  set #properties($properties) {
    if(this.#_properties !== undefined) return
    if($properties?.classToString === Content.toString()) {
      this.#_properties = $properties.object
    }
    this.#_properties = $properties
    return this.#_properties
  }
  get options() { return this.#options }
  get schema() { return this.#schema }
  set schema($schema) {
    if(this.#schema !== undefined)  { return }
    const typeOfSchema = typeOf($schema)
    if(['undefined', 'null'].includes(typeOfSchema)) { this.#schema = null }
    else if(
      $schema instanceof Schema
    ) { this.#schema = $schema }
    else if(typeOfSchema === 'array') { this.#schema = new Schema(...arguments) }
    else if(typeOfSchema === 'object') { this.#schema = new Schema($schema) }
  }
  get classToString() { return Content.toString() }
  get object() { return this.#parse({ type: 'object' }) }
  get string() { return this.#parse({ type: 'string' }) }
  get type() {
    if(this.#type !== undefined) return this.#type
    this.#type = typeOf(this.#properties)
    return this.#type
  }
  get parent() {
    if(this.#parent !== undefined)  return this.#parent
    this.#parent = (this.options.parent) ? this.options.parent : null
    return this.#parent
  }
  get root() {
    let root = this
    iterateParents: 
    while(root) {
      if([undefined, null].includes(root.parent)) { break iterateParents }
      root = root.parent
    }
    return root
  }
  get key() {
    if(this.#key !== undefined) { return this.#key }
    if(this.path) { this.#key = this.path.split('.').pop() }
    else { this.#key = null }
    return this.#key
  }
  get path() {
    if(this.#path !== undefined)  return this.#path
    this.#path = (this.options.path)
      ? String(this.options.path)
      : null
    return this.#path
  }
  get target() {
    if(this.#target !== undefined) return this.#target
    this.#target = typedObjectLiteral(this.#properties)
    return this.#target
  }
  get proxy() {
    if(this.#proxy !== undefined) return this.#proxy
    this.#proxy = new Proxy(this.target, this.#handler)
    return this.#proxy
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
    replacer: null,
    space: 0,
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
    const { type, replacer, space } = $settings
    if(type === 'object' || type === 'Object') {
      return parsement
    }
    else if(type === 'string' || type === 'String') {
      return JSON.stringify(parsement, replacer, space)
    }
    else { return undefined }
  }
}