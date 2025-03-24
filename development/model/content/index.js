import { typedObjectLiteral, typeOf } from '../../coutil/index.js'
import Traps from './handler/traps/index.js'
import Schema from '../schema/index.js'
import Options from './options/index.js'
import ContentEvent from './events/content/index.js'
import ObjectProperty from './handler/traps/object/index.js'
import ArrayProperty from './handler/traps/array/index.js'
import AccessorProperty from './handler/traps/accessor/index.js'

const Default = Object.freeze({
  object: [{
    keys: [
      'entries', 'fromEntries', 'getOwnPropertyDescriptors', 
      'getOwnPropertyNames', 'getOwnPropertySymbols', 
      'getPrototypeOf', 'isExtensible', 'isFrozen', 'isSealed', 
      'keys', 'preventExtensions', 'values',
    ],
    createMethod: function($methodName, $content) {
      return Object[$methodName].bind(null, $content)
    },
  }, {
    keys: [
      'getOwnPropertyDescriptor', 'groupBy', 'hasOwn', 'hasOwnProperty', 
      'is', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 
      'toString', 'valueOf', 
    ], 
    createMethod: function($methodName, $content) {
      return Object[$methodName].bind(null, $content)
    },
  }, {
    keys: Object.keys(ObjectProperty), 
    createMethod: function($methodName, $content, $options) {
      return ObjectProperty[$methodName].bind(null, $content, $options) 
    }
  }],
  array: [{
    keys: [
      'from', 'fromAsync', 'isArray', 'of', 
    ], 
    createMethod: function($methodName, $content) {
      return Array[$methodName]
    }, 
  }, {
    keys: [
      'at', 'every', 'filter', 'find', 'findIndex', 'findLast',
      'findLastIndex', 'flat', 'flatMap', 'forEach', 'includes', 
      'indexOf', 'join', 'lastIndexOf', 'map', 'reduce', 'reduceRight', 
      'slice', 'some', 'sort', 'toReversed',  'toSorted', 'toSpliced', 
      'with', 
    ], 
    createMethod: function($methodName, $content) {
      return Array.prototype[$methodName].bind(null, $content)
    }
  }, {
    keys: Object.keys(ArrayProperty), 
    createMethod: function($methodName, $content, $options) {
      return ArrayProperty[$methodName].bind(null, $content, $options)
    }
  }],
  accessor: [{
    keys: Object.keys(AccessorProperty),
    createMethod: function($methodName, $content, $options) {
      return AccessorProperty[$methodName].bind(null, $content, $options)
    }
  }]
})
export default class Content extends EventTarget {
  #_properties
  #options
  #schema
  #type
  #target
  #parent
  #key
  #path
  #_handler
  constructor($properties = {}, $schema = null, $options = {}) {
    super()
    this.#properties = $properties
    this.#options = Options($options)
    this.schema = $schema
    iterateDefaultPropertyClasses: // Object, Array, Accessor
    for(const [$propertyClassName, $propertyClasses] of Object.entries(Default)) {
      iteratePropertyClasses: 
      for(const $propertyClass of $propertyClasses) {
        const { keys, createMethod } = $propertyClass
        for(const $methodName of keys) {
          if($propertyClassName === 'accessor') {
            const methodOptions = this.options?.traps[$propertyClassName][$methodName] || {}
            Object.defineProperty(this, $methodName, {
              enumerable: false, writable: false, configurable: false, 
              value: createMethod($methodName, this, methodOptions),
            })
          }
          else {
            Object.defineProperty(this, $methodName, {
              enumerable: false, writable: false, configurable: false, 
              value: createMethod($methodName,  this),
            })
          }
        }
      }
    }
    const { contentAssignmentMethod } = this.options
    this[contentAssignmentMethod](this.#properties)
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
  #parse($settings = {
    type: 'object',
    replacer: null,
    space: 0,
  }) {
    let parsement
    if(this.type === 'object') { parsement = {} }
    if(this.type === 'array') { parsement = [] }
    parsement = Object.entries(
      Object.getOwnPropertyDescriptors(this.target)
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