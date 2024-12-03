import { typeOf, typedObjectLiteral } from '../../Coutil/index.js'
import Content from '../Content/index.js'
import Verification from './Verification/index.js'
import Validation from './Validation/index.js'
import * as Variables from './Variables/index.js'
import {
  TypeValidator, RangeValidator, LengthValidator, EnumValidator, MatchValidator
} from './Validators/index.js'
import Options from './Options/index.js' 
const ValidatorKeys = {
  type: ['type'], range: ['min', 'max'], length: ['minLength', 'maxLength']
}
export default class Schema extends EventTarget{
  options
  #properties
  #_type
  #_context
  constructor($properties = {}, $options = {}) {
    super()
    this.#properties = $properties
    this.options = Object.assign({}, Options, $options)
  }
  get validationType() { return this.options.validationType }
  get type() {
    if(this.#_type !== undefined) return this.#_type
    this.#_type = typeOf(typedObjectLiteral(this.#properties))
    return this.#_type
  }
  get context() {
    if(this.#_context !== undefined) return this.#_context
    let properties
    if(this.type === 'array') {
      properties = this.#properties.slice(0, 1)
      this.#_context = []
    }
    else if(this.type === 'object') {
      properties = this.#properties 
      this.#_context = {}
    }
    const Types = Object.values(Variables.Types)
    iterateProperties: 
    for(let [
      $contextKey, $contextValue
    ] of Object.entries(properties)) {
      let contextValue
      // Context Value: Schema
      if($contextValue instanceof Schema) {
        this.#_context[$contextKey] = $contextValue
        continue iterateProperties
      }
      // Context Value: Object
      else if(
        typeof $contextValue.type === 'object' && $contextValue.type
      ) {
        this.#_context[$contextKey] = new Schema($contextValue.type, this.options)
        continue iterateProperties
      }
      // Context Value: Primitive, Null
      else {
        this.#_context[$contextKey] = $contextValue
      }
      contextValue = this.#_context[$contextKey]
      // Context Validators
      contextValue.validators = (contextValue.validators)
        ? contextValue.validators
        : [new TypeValidator()]
      // contextValue.validators.unshift()
      const addValidators = []
      // Context Validator: Add Range
      if(
        typeof contextValue.min === 'number' || 
        typeof contextValue.max === 'number'
      ) { addValidators.push(new RangeValidator({
        min: { value: contextValue.min },
        max: { value: contextValue.max },
      })) }
      else if(
        (
          typeof contextValue.min === 'object' &&
          typeof contextValue.min[0] === 'number'
        ) || (
          typeof contextValue.max === 'object' &&
          typeof contextValue.max[0] === 'number'
        ) {
          addValidators.push(new RangeValidator({
            min
          }))
        }
      )
      // Context Validator: Add Length
      if(
        typeof contextValue.minLength === 'number' ||
        typeof contextValue.maxLength === 'number'
      ) { addValidators.push(new LengthValidator()) }
      // Context Validator: Add Enum
      if(
        Array.isArray(contextValue.enum) &&
        contextValue.enum.length > 0
      ) { addValidators.push(new EnumValidator()) }
      // Context Validator: Add Match
      if(
        Array.isArray(contextValue.match) &&
        contextValue.match.length > 0
      ) { addValidators.push(new MatchValidator()) }
      contextValue.validators = contextValue.validators.concat(addValidators)
    }
    return this.#_context
  }
  validate() {
    let $arguments = [...arguments]
    let $contentName, $content
    if($arguments.length === 1) { $contentName = null; $content = $arguments.shift() }
    if($arguments.length === 2) { $contentName = $arguments.shift(); $content = $arguments.shift() }
    if($content?.classToString === Content.toString()) { $content = $content.object }
    const validation = new Validation({
      type: this.validationType,
      context: this.context,
      key: $contentName, 
      value: $content,
      properties: typedObjectLiteral(this.type),
    })
    const contentProperties = Object.entries($content)
    let contentPropertyIndex = 0
    // Iterate Content Properties 
    while(contentPropertyIndex < contentProperties.length) {
      const [$contentKey, $contentValue] = contentProperties[contentPropertyIndex]
      const propertyValidation = this.validateProperty($contentKey, $contentValue)
      validation.properties[$contentKey] = propertyValidation
      if(propertyValidation.valid === true) { validation.advance.push(propertyValidation) } 
      else if(propertyValidation.valid === false) { validation.deadvance.push(propertyValidation) } 
      else if(propertyValidation.valid === undefined) { validation.unadvance.push(propertyValidation )}
      contentPropertyIndex++
    }
    if(this.validationType === 'object') {
      if(validation.deadvance.length) { validation.valid = false }
      else if(validation.advance.length) { validation.valid = true }
      else if(validation.unadvance.length) { validation.valid = undefined }
    }
    else if(this.validationType === 'primitive') {
      if(validation.advance.length) { validation.valid = true }
      else if(validation.deadvance.length) { validation.valid = true }
      else if(validation.unadvance.length) { validation.valid = undefined }
    }
    return validation
  }
  validateProperty($key, $value) {
    let contextValue
    if(this.type === 'array') { contextValue = this.context[0] }
    else if(this.type === 'object') { contextValue = this.context[$key] }
    let propertyValidation = new Validation({
      type: this.validationType,
      context: contextValue,
      key: $key,
      value: $value,
    })
    // Context Value: Undefined
    if(contextValue === undefined) {
      const verification = new Verification({
        type: null,
        context: contextValue,
        key: $key,
        value: $value,
      }, this)
      verification.pass = false
      propertyValidation.unadvance.push(verification)
    }
    // Context Value: Object
    else if(contextValue instanceof Schema) {
      const validation = contextValue.validate($key, $value)
      if(validation.valid === true) { propertyValidation.advance.push(validation) }
      else if(validation.valid === false) { propertyValidation.deadvance.push(validation) }
      else if(validation.valid === undefined) { propertyValidation.unadvance.push(validation) }
    }
    // Context Value: Primitive
    else {
      iterateContextValueValidators: 
      contextValue.validators.reduce(
        ($propertyValidation, $validator, $validatorIndex, $validators) => {
          const verification = $validator.validate(contextValue, $key, $value)
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