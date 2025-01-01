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
  options
  #_type
  #properties
  #_requiredProperties
  #_context
  constructor($properties = {}, $options = {}) {
    super()
    this.#properties = $properties
    this.options = Object.assign({}, Options, $options)
    // this.context 
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
    for(const [$propertyKey, $propertyDefinition] of Object.entries(this.context)) {
      if($propertyDefinition.required?.value === true) { requiredProperties[$propertyKey] = $propertyDefinition }
    }
    this.#_requiredProperties = requiredProperties
    return this.#_requiredProperties
  }
  get requiredPropertiesSize() { return Object.keys(this.requiredProperties).length }
  get context() {
    if(this.#_context !== undefined) return this.#_context
    this.#_context = new Context(this.#properties, this.options, this)
    return this.#_context
  }
  validate() {
    let $arguments = [...arguments]
    let $contentName, $content, $target
    if($arguments.length === 1) { $contentName = null; $content = $arguments.shift(); $target = null }
    else if(
      $arguments.length === 2 &&
      typeof $arguments[0] === 'string'
    ) { $contentName = $arguments.shift(); $content = $arguments.shift(); $target = null }
    else if(
      $arguments.length === 2 &&
      typeof $arguments[0] === 'object'
    ) { $contentName = null; $content = $arguments.shift(); $target = $arguments.shift() }
    else if(
      $arguments.length === 3 &&
      typeof $arguments[0] === 'string'
    ) { $contentName = $arguments.shift(); $content = $arguments.shift(); $target = $arguments.shift() }
    if($content?.classToString === Content.toString()) { $content = $content.object }
    if($target?.classToString === Content.toString()) { $target = $target.object }
    const validation = new Validation({
      // type: this.required,
      definition: this.context,
      key: $contentName, 
      value: $content,
      properties: typedObjectLiteral(this.type),
    })
    const contentProperties = Object.entries($content)
    let contentPropertyIndex = 0
    let deadvancedRequiredProperties = []
    // Iterate Content Properties 
    while(contentPropertyIndex < contentProperties.length) {
      const [$contentKey, $contentValue] = contentProperties[contentPropertyIndex]
      const propertyValidation = this.validateProperty($contentKey, $contentValue, $content, $target)
      const deadvancedRequiredPropertyValidation = propertyValidation.deadvance.filter(
        ($verification) => $verification.type === 'required'
      )
      validation.properties[$contentKey] = propertyValidation
      if(deadvancedRequiredPropertyValidation.length) { validation.deadvance.push(propertyValidation) }
      else if(propertyValidation.valid === true) { validation.advance.push(propertyValidation) } 
      else if(propertyValidation.valid === false) { validation.deadvance.push(propertyValidation) } 
      else if(propertyValidation.valid === undefined) { validation.unadvance.push(propertyValidation )}
      deadvancedRequiredProperties = deadvancedRequiredProperties.concat(deadvancedRequiredPropertyValidation)
      contentPropertyIndex++
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
      const validation = propertyDefinition.validate($key, $value, $source, $target)
      if(validation.valid === true) { propertyValidation.advance.push(validation) }
      else if(validation.valid === false) { propertyValidation.deadvance.push(validation) }
      else if(validation.valid === undefined) { propertyValidation.unadvance.push(validation) }
    }
    // Context Value: Primitive
    else {
      iterateContextValueValidators: 
      propertyDefinition.validators.reduce(
        ($propertyValidation, $validator, $validatorIndex, $validators) => {
          const verification = $validator.validate($key, $value, $source, $target)
          if(verification.pass === true) { $propertyValidation.advance.push(verification) }
          else if(verification.pass === false) { $propertyValidation.deadvance.push(verification) }
          else if(verification.pass === undefined) { $propertyValidation.unadvance.push(verification) }
          return $propertyValidation
        }, propertyValidation
      )
    }
    if(propertyValidation.deadvance.length) { propertyValidation.valid = false }
    else if(propertyValidation.advance.length) { propertyValidation.valid = true }
    else if(propertyValidation.unadvance.length) { propertyValidation.valid = false }
    return propertyValidation
  }
}