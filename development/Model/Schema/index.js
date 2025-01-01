import {
  expandTree, isPropertyDefinition, typedObjectLiteral, typeOf, variables as Variables
} from '../../Coutil/index.js'
import Content from '../Content/index.js'
import Context from './Context/index.js'
import Verification from './Verification/index.js'
import Validation from './Validation/index.js'
import { RequiredValidator } from './Validators/index.js'
import Options from './Options/index.js' 

export default class Schema extends EventTarget{
  #properties
  options
  #_type
  #_context
  #_requiredProperties
  #_requiredPropertiesSize
  constructor($properties = {}, $options = {}) {
    super()
    this.#properties = $properties
    this.options = Object.assign({}, Options, $options)
  }
  get type() {
    if(this.#_type !== undefined) return this.#_type
    this.#_type = typeOf(typedObjectLiteral(this.#properties))
    return this.#_type
  }
  get required() { return this.options.required }
  get requiredProperties() {
    if(this.#_requiredProperties !== undefined) return this.#_requiredProperties
    let requiredProperties = typedObjectLiteral(this.type)
    iterateContextEntries: 
    for(const [$propertyKey, $propertyDefinition] of Object.entries(this.context)) {
      if($propertyDefinition.required?.value === true) { requiredProperties[$propertyKey] = $propertyDefinition }
    }
    this.#_requiredProperties = requiredProperties
    return this.#_requiredProperties
  }
  get requiredPropertiesSize() {
    if(this.#_requiredPropertiesSize !== undefined) return this.#_requiredPropertiesSize
    this.#_requiredPropertiesSize = Object.keys(this.requiredProperties).length
    return this.#_requiredPropertiesSize
  }
  get verificationType() { return this.options.verificationType }
  get context() {
    if(this.#_context !== undefined) return this.#_context
    this.#_context = new Context(this.#properties, this)
    return this.#_context
  }
  #parseValidateArguments() {
    let $arguments = [...arguments]
    let $sourceName, $source, $target
    if($arguments.length === 1) {
      $sourceName = null; $source = $arguments.shift(); $target = null
    }
    else if($arguments.length === 2 && typeof $arguments[0] === 'string') {
      $sourceName = $arguments.shift(); $source = $arguments.shift(); $target = null
    }
    else if($arguments.length === 2 && typeof $arguments[0] === 'object') {
      $sourceName = null; $source = $arguments.shift(); $target = $arguments.shift()
    }
    else if($arguments.length === 3 && typeof $arguments[0] === 'string') {
      $sourceName = $arguments.shift(); $source = $arguments.shift(); $target = $arguments.shift()
    }
    if($source?.classToString === Content.toString()) { $source = $source.object }
    if($target?.classToString === Content.toString()) { $target = $target.object }
    return { $sourceName, $source, $target }
  }
  validate() {
    const { $sourceName, $source, $target } = this.#parseValidateArguments(...arguments)
    const validation = new Validation({
      definition: this.context,
      key: $sourceName, 
      value: $source,
      properties: typedObjectLiteral(this.type),
    })
    const sourceProperties = Object.entries($source)
    let sourcePropertyIndex = 0
    let deadvancedRequiredProperties = []
    // Iterate Content Properties 
    while(sourcePropertyIndex < sourceProperties.length) {
      const [$sourceKey, $sourceValue] = sourceProperties[sourcePropertyIndex]
      const propertyValidation = this.validateProperty($sourceKey, $sourceValue, $source, $target)
      const deadvancedRequiredPropertyValidation = propertyValidation.deadvance.filter(
        ($verification) => $verification.type === 'required'
      )
      validation.properties[$sourceKey] = propertyValidation
      if(propertyValidation.valid === true) { validation.advance.push(propertyValidation) } 
      else if(propertyValidation.valid === false) { validation.deadvance.push(propertyValidation) } 
      else if(propertyValidation.valid === undefined) { validation.unadvance.push(propertyValidation )}
      deadvancedRequiredProperties = deadvancedRequiredProperties.concat(deadvancedRequiredPropertyValidation)
      sourcePropertyIndex++
    }
    if(this.required === true) {
      if(validation.deadvance.length) { validation.valid = false }
      else if(validation.advance.length) { validation.valid = true }
      else if(validation.unadvance.length) { validation.valid = undefined }
      else { validation.valid = false }
    }
    else if(this.required === false) {
      if(deadvancedRequiredProperties.length) { validation.valid = false }
      else if(validation.advance.length) { validation.valid = true }
      else if(validation.deadvance.length) { validation.valid = false }
      else if(validation.unadvance.length) { validation.valid = undefined }
      else { validation.valid = false }
    }
    return validation
  }
  validateProperty($key, $value, $source, $target) {
    let propertyDefinition
    if(this.type === 'array') { propertyDefinition = this.context[0] }
    else if(this.type === 'object') { propertyDefinition = this.context[$key] }
    const propertyValidation = new Validation({
      // type: this.required,
      definition: propertyDefinition,
      key: $key,
      value: $value,
    })
    // Context Value: Undefined
    if(propertyDefinition === undefined) {
      const verification = new Verification({
        type: null,
        definition: null,
        key: $key,
        value: $value,
      }, this)
      verification.pass = false
      propertyValidation.unadvance.push(verification)
    }
    // Context Value: Object
    else if(propertyDefinition instanceof Schema) {
      let validation
      if($target && $target[$key]) { validation = propertyDefinition.validate($key, $value, $target[$key]) }
      else { validation = propertyDefinition.validate($key, $value) }
      if(validation.valid === true) { propertyValidation.advance.push(validation) }
      else if(validation.valid === false) { propertyValidation.deadvance.push(validation) }
      else if(validation.valid === undefined) { propertyValidation.unadvance.push(validation) }
    }
    // Context Value: Primitive
    else {
      iterateContextValueValidators:
      for(const [$validatorIndex, $validator] of Object.entries(propertyDefinition.validators)) {
        const verification = $validator.validate($key, $value, $source, $target)
        if(verification.pass === true) { propertyValidation.advance.push(verification) }
        else if(verification.pass === false) { propertyValidation.deadvance.push(verification) }
        else if(verification.pass === undefined) { propertyValidation.unadvance.push(verification) }
        if(this.verificationType === 'one' && propertyValidation.deadvance.length) { break iterateContextValueValidators }
      }
    }
    if(propertyValidation.deadvance.length) { propertyValidation.valid = false }
    else if(propertyValidation.advance.length) { propertyValidation.valid = true }
    else if(propertyValidation.unadvance.length) { propertyValidation.valid = false }
    return propertyValidation
  }
}